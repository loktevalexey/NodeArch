const express = require('express');
const path = require('path');
const mysql = require("mysql");

const { logLine, reportServerError, reportRequestError } = require('./utils');
const { newConnectionFactory, selectQueryFactory } = require("./utils_db");
const { composeMaket_New } = require("./makets");

const poolConfig={
    connectionLimit : 10,     // полагаем что БД выдержит 10 соединений, т.е. в пуле будет максимум 10 соединений
    host     : 'localhost',   // на каком компьютере расположена база данных
    user     : 'nodeuser',    // каким пользователем подключаемся (на учебном сервере - "root")
    password : 'nodepass',    // каким паролем подключаемся (на учебном сервере - "1234")
    database : 'site_db',     // к какой базе данных подключаемся
    debug: false,
};
let pool = mysql.createPool(poolConfig);

const webserver = express();

const port = 6530;
const logFN = path.join(__dirname, '_server.log');

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

        let html=await composeMaket_New( // вызываем построение макета новости
            { // служебные параметры
                connection, // соединение с БД - мы полагаем, что макету потребуется делать свои операции с БД
                logFN, // имя файла лога - мы полагаем, что макету потребуется что-то записать в лог
            },
            { // данные приложения
                newInfo:news[0], // информация о новости из УРЛа - мы полагаем, что в макете будет блок "новость из УРЛа" и ему нужна эта информация
            }
        );
        res.send(html);
    }
    catch ( error ) {
        reportServerError(error,res,logFN);
    }
    finally {
        if ( connection )
            connection.release();
    }

});

webserver.use(
    express.static(path.resolve(__dirname,"static"))
);

webserver.listen(port);
logLine(logFN,"web server running on port "+port);
