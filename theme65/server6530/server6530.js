const express = require('express');
const path = require('path');
const mysql = require("mysql");

const { logLine, reportServerError, reportRequestError, arrayToHash } = require('./utils');
const { newConnectionFactory, selectQueryFactory } = require("./utils_db");
const { composeMaket_New, composeMaket_IndPage } = require("./makets");

const poolConfig={
    connectionLimit : 10,     // полагаем что БД выдержит 10 соединений, т.е. в пуле будет максимум 10 соединений
    host     : 'localhost',   // на каком компьютере расположена база данных
    user     : 'nodeuser',    // каким пользователем подключаемся (на учебном сервере - "root")
    password : 'nodepass',    // каким паролем подключаемся (на учебном сервере - "1234")
    database : 'site_db',     // к какой базе данных подключаемся
};
let pool = mysql.createPool(poolConfig);

const webserver = express();

const port = 6530;
const logFN = path.join(__dirname, '_server.log');

webserver.get('/', async (req, res, next) => { 
    logLine(logFN,"обращение к / - рендерим как /main");
    req.url='/main';
    next();
});

// УРЛы вида /new/xxx
webserver.get('/new/:urlcode', async (req, res) => { 
    let newUrlCode=req.params.urlcode;
    logLine(logFN,'вид страницы: новость, urlcode='+newUrlCode);

    let connection=null;
    try {
        connection=await newConnectionFactory(pool,res);

        let news=await selectQueryFactory(connection, `
            select header, content, metakeywords, metadescription
            from news
            where url_code=?
        ;`, [newUrlCode]);

        if ( news.length!==1 ) {
            logLine(logFN,"новость не найдена, urlcode="+newUrlCode);
            res.status(404).send("Извините, такой новости у нас нет!");
        }
        else {

            // некоторым блокам потребуется содержимое таблицы настроек
            let optionsArr=await selectQueryFactory(connection, `select * from options;`, []);
            let options=arrayToHash(optionsArr,'code');

            // все новости рендерим по "макету одной новости", но можно для разных новостей использовать разные макеты
            let html=await composeMaket_New( // вызываем построение макета одной новости
                { // служебные параметры
                    connection, // соединение с БД - мы полагаем, что макету потребуется делать свои операции с БД
                    logFN, // имя файла лога - мы полагаем, что макету потребуется что-то записать в лог
                },
                { // данные приложения
                    newInfo:news[0], // информация о новости из УРЛа - мы полагаем, что в макете будет блок "новость из УРЛа" и ему нужна эта информация
                    options, // настройки сайта
                }
            );
            res.send(html);
        }
    }
    catch ( error ) {
        reportServerError(error.stack,res,logFN);
    }
    finally {
        if ( connection )
            connection.release();
    }

});

// УРЛы вида /xxx
webserver.get('/:urlcode', async (req, res) => { 
    let pageUrlCode=req.params.urlcode;
    logLine(logFN,'вид страницы: индивидуальная, urlcode='+pageUrlCode);

    // если мы хотим запретить прямое обращение к /main из браузера - можно тут сравнить req.url и req.originalUrl

    let connection=null;
    try {
        connection=await newConnectionFactory(pool,res);

        let indPages=await selectQueryFactory(connection, `
            select title, content, metakeywords, metadescription
            from indpages
            where url_code=?
        ;`, [pageUrlCode]);

        if ( indPages.length!==1 ) {
            logLine(logFN,"индивидуальная страница не найдена, urlcode="+pageUrlCode);
            res.status(404).send("Извините, такой страницы у нас нет!");
        }
        else {

            // некоторым блокам потребуется содержимое таблицы настроек
            let optionsArr=await selectQueryFactory(connection, `select * from options;`, []);
            let options=arrayToHash(optionsArr,'code');

            // все новости рендерим по "макету индивидуальной страницы", но можно для разных индивидуальных страниц использовать разные макеты
            let html=await composeMaket_IndPage( // вызываем построение макета индивидуальной страницы
                { connection, logFN },
                { // данные приложения
                    indPageInfo:indPages[0], // информация о индивидуальной странице
                    options, // настройки сайта
                }
            );
            res.send(html);
        }
    }
    catch ( error ) {
        reportServerError(error.stack,res,logFN);
    }
    finally {
        if ( connection )
            connection.release();
    }

});

webserver.use(
    express.static(path.resolve(__dirname,"static"))
);

webserver.listen(port,()=>{
    logLine(logFN,"web server running on port "+port);
});
