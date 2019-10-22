const mysql = require("mysql");
const fetch = require("isomorphic-fetch");
const { sha256 } = require("js-sha256");

const { newConnectionFactory, selectQueryFactory, modifyQueryFactory, getLastInsertedId } = require("./utils_db");
const { removeTags } = require("./utils");

async function getUrls(connection) {

    let urls=[];

    let indPages=await selectQueryFactory(connection, `select url_code from indpages;`, []);
    indPages.forEach( indPageRow => {
        urls.push({
            url:`/${indPageRow.url_code}`,
            groupCode:'indpage',
            groupParams:{indPageURLCode:indPageRow.url_code},
        });
    } );

    let news=await selectQueryFactory(connection, `select url_code from news;`, []);
    news.forEach( newRow => {
        urls.push({
            url:`/new/${newRow.url_code}`,
            groupCode:'new',
            groupParams:{newURLCode:newRow.url_code},
        });
    } );

    return urls;
}

async function indexURLContent(connection,indexUrlId,html) {

    // удаляем все теги, заменяем на пробелы, чтобы не склеились тексты из соседних тегов
    // (полагаем, что выделений тегами прямо посреди слов не бывает)
    let text=removeTags(html," ");
    // оставляем только буквы
    text=text.replace(/[^а-яА-ЯёЁ]/g," ");
    const words=text
        .toUpperCase()
        .split(/\s+/) // получаем массив слов
        .filter(word => word.length>3) // удаляем пустые и слишком короткие слова
    ;

    // удаляем все старые слова по этому УРЛу из таблицы
    await modifyQueryFactory(connection, `delete from index_urls_words where index_url=?;`, [indexUrlId]);

    if ( words.length ) {
        // добавляем все новые слова по этому УРЛу
        // можно сделать много SQL-запросов insert, но это очень неэффективно
        // скомпонуем один запрос в формате insert into таблица(поля) values (значения), (значения), (значения);
        let valuesTexts=[];
        let valuesDatas=[];
        words.forEach( (word,index) => { 
            valuesTexts.push(`(${indexUrlId},${index},?)`); 
            valuesDatas.push(word);
        } );
        await modifyQueryFactory(connection, `insert into index_urls_words(index_url,word_ord,word) values ${valuesTexts.join(", ")};`, valuesDatas);
    }

}

async function processURL(connection,urlInfo) {

    // обращаемся к серверу 6530 (полагаем что он запущен) по указанному УРЛу GET-запросом, читаем HTML-код страницы, как читает его браузер
    const response=await fetch('http://localhost:6530'+urlInfo.url);
    const html=await response.text();

    // получаем контрольную сумму HTML-кода (сырого содержимого УРЛа)
    // можно любым алгоритмом, который даёт хотя бы 64-битный CRC (32 бита точно мало, велика вероятность коллизий)
    const htmlCRC=sha256(html);

    // в таблице index_urls проверяем, есть ли такой УРЛ
    let indexUrls=await selectQueryFactory(connection, `select id, html_crc from index_urls where url=?;`, [urlInfo.url]);
    if ( indexUrls.length===0 ) {
        // такого УРЛа раньше не было - добавляем...
        await modifyQueryFactory(connection, `
            insert into index_urls(url,group_code,group_params,html_crc,add_dt,actual_flag,last_render_dt,last_modification_dt) 
            values (?,?,?,?,now(),1,now(),now())
        ;`, [urlInfo.url,urlInfo.groupCode,JSON.stringify(urlInfo.groupParams),htmlCRC]);
        const indexUrlId=await getLastInsertedId(connection);
        // и индексируем содержимое
        await indexURLContent(connection,indexUrlId,html);
    }
    else {
        // такой УРЛ есть, полагаем что ровно один, по логике больше не будет (но можно проверить что indexUrls.length===1, иначе ошибка)
        const indexUrlId=indexUrls[0].id;

        // проставляем, что он актуальный и его дату-время последнего рендера
        await modifyQueryFactory(connection, `update index_urls set actual_flag=1, last_render_dt=now() where id=?;`, [indexUrlId]);

        // проверяем, изменилось ли содержимое этого УРЛа (если содержимое изменилось - CRC тоже изменилось)
        if ( indexUrls[0].html_crc!==htmlCRC ) {
            // содержимое изменилось! надо переиндексировать
            await indexURLContent(connection,indexUrlId,html);
            await modifyQueryFactory(connection, `update index_urls set last_modification_dt=now() where id=?;`, [indexUrlId]);
        }

    }
}

(async function() {

    const poolConfig={
        connectionLimit : 1,      // server6530.js может создать 10 соединений, и этот скрипт ещё одно, думаем что СУБД выдержит 11 соединений
        host     : 'localhost',   // на каком компьютере расположена база данных
        user     : 'nodeuser',    // каким пользователем подключаемся (на учебном сервере - "root")
        password : 'nodepass',    // каким паролем подключаемся (на учебном сервере - "1234")
        database : 'site_db',     // к какой базе данных подключаемся
        debug: false,
    };
    let pool = mysql.createPool(poolConfig); // вообще говоря, пул тут не нужен, нам нужно ровно 1 соединение, но хочется пользовать уже разработанными промисифицированными функциями, а они работают с пулом
    
    let connection=await newConnectionFactory(pool,null);

    let urls=await getUrls(connection);

    await modifyQueryFactory(connection, `update index_urls set actual_flag=0;`, []);

    console.log("обрабатываем УРЛы:");
    for ( var u=0; u<urls.length; u++ ) {
        const urlInfo=urls[u];
        console.log(urlInfo.url);
        await processURL(connection,urlInfo);
    }

    connection.release();

    // закрываем пул соединений
    pool.end(function(err) {
        if (err) {
            console.log(err.message);
            return;
        }
    });

})();
