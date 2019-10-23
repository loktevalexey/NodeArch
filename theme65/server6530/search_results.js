const mysql = require("mysql");

const { newConnectionFactory, selectQueryFactory } = require("./utils_db");

const wordRE=/[а-яА-ЯёЁa-zA-Z]{4,}/g; // регулярка для поиска того, что мы будем считать отдельным словом

(async function() {

    const poolConfig={
        connectionLimit : 1,      // server6530.js может создать 10 соединений, и этот скрипт ещё одно, думаем что СУБД выдержит 11 соединений
        host     : 'localhost',   // на каком компьютере расположена база данных
        user     : 'nodeuser',    // каким пользователем подключаемся (на учебном сервере - "root")
        password : 'nodepass',    // каким паролем подключаемся (на учебном сервере - "1234")
        database : 'site_db',     // к какой базе данных подключаемся
        debug: false,
    };
    let pool = mysql.createPool(poolConfig);
    
    let connection=await newConnectionFactory(pool,null);

    const searchPhrase="неделя Минск"; // будем считать что пользователь ввёл именно эту поисковую фразу

    // разложим поисковую фразу на слова, по тому же алгоритму по которому индексировали содержимое УРЛов
    let inParts=[];
    let words=[];
    while (true) {
        let searchRes=wordRE.exec(searchPhrase);
        if ( !searchRes )
            break;
        inParts.push("?");
        words.push(searchRes[0].toUpperCase());
    }
    console.log(words);

    /*
    хотим получить пересечение слов запроса с проиндексированными словами, т.е. примерно такой запрос:
        select index_url, clean_txt_index, word
        from index_urls_words
        where word in ('МИНСК','НЕДЕЛЯ')
        order by index_url, clean_txt_index
    а то есть, с синтаксисом подстановки:    
        "select index_url, clean_txt_index, word
        from index_urls_words
        where word in (?,?)
        order by index_url, clean_txt_index",
        ['МИНСК','НЕДЕЛЯ']
    в in подставим сформированный выше inParts
    */

    let allHits=await selectQueryFactory(connection, `
        select index_url, clean_txt_index, word
        from index_urls_words
        where word in (${inParts.join(",")})
        order by index_url, clean_txt_index
    ;`, words);

    // для каждого index_url найдём:
    // sp_hits - сколько раз поисковые слова вообще встретились в содержимом УРЛа (с повторами, т.е. может быть например 10 для поисковой фразы "неделя Минск")
    // sp_uniq_hits - сколько из поисковых слов встретились хотя бы один раз (т.е. для поисковой фразы "неделя Минск" может быть 0, 1, 2)
    let spHits={}; // ключ - index_url, значение - { sp_hits:XXX, sp_uniq_hits:XXX, sp_words:{} }, в sp_words учитываем какие поисковые слова уже встречались
    allHits.forEach( hitRow => {
        if ( !(hitRow.index_url in spHits) )
            spHits[hitRow.index_url]={ sp_hits:0, sp_uniq_hits:0, sp_words:{} };
        let spHitsRow=spHits[hitRow.index_url];

        spHitsRow.sp_hits++;

        if ( !(hitRow.word in spHitsRow.sp_words) ) {
            spHitsRow.sp_words[hitRow.word]=true;
            spHitsRow.sp_uniq_hits++;
        }
    } );
    // по-хорошему надо бы ещё анализировать, насколько близко друг к другу нашлись эти слова (по близости clean_txt_index)
    // и сравнивать слова в поисковой фразе и в индексе неточно, а с учётом морфологии (но это задача другого уровня)

    // скомпонуем из spHits массив и отсортируем по релевантности
    // каждому из критериев подходимости УРЛа под поисковую фразу нужно назначить свой удельный вес и сформировать общий признак "релевантность"
    let results=[];
    for ( let index_url in spHits ) {
        let spHitsRow=spHits[index_url];
        results.push( { index_url, relev:(spHitsRow.sp_uniq_hits*10+spHitsRow.sp_hits*1) } );
    }
    results.sort( (r1,r2) => r2.relev-r1.relev );

    // перечень УРЛов, отсортированный по релевантности, готов
    // теперь сформируем данные для компоновки страницы с результатами поиска
    // ей, кроме собственно перечня УРЛов, нужны ещё названия страниц
    // и group_code+group_params, чтобы можно было результаты поиска по-разному представить (новости одним способом, инд. страницы другим)
    // или чтобы можно было пофильтровать или разбить результаты поиска на группы (новости в одной вкладке, инд. страницы в другой)

    // чем делать тыщу запросов ради каждого index_url, лучше зачитаем сразу всю таблицу index_urls (нужные поля) и возьмём из неё то что нам нужно
    let indexUrls=await selectQueryFactory(connection, `select id, title, group_code, group_params from index_urls;`);
    // преобразуем в хэш, ключ - id УРЛа, значение - прочитанная строка из indexUrls
    let indexUrlsIndex={};
    indexUrls.forEach( urlRow => { indexUrlsIndex[urlRow.id]=urlRow; } );

    results.forEach( result => {
        result.title=indexUrlsIndex[result.index_url].title;
        result.group_code=indexUrlsIndex[result.index_url].group_code;
        result.group_params=indexUrlsIndex[result.index_url].group_params;
    } );

    console.log(results);

    connection.release();

    pool.end(function(err) {
        if (err) {
            console.log(err.message);
            return;
        }
    });

})();
