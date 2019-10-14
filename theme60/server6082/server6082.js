const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mysql=require("mysql");

const { logLineAsync } = require('../../utils/utils');

const connectionConfig={
    host     : 'localhost',  // на каком компьютере расположена база данных
    user     : 'nodeuser',   // каким пользователем подключаемся (на учебном сервере - "root")
    password : 'nodepass',   // каким паролем подключаемся (на учебном сервере - "1234")
    database : 'learning_db' // к какой базе данных подключаемся
};

const webserver = express();

const port = 6082;
const logFN = path.join(__dirname, '_server.log');

// webserver.use(express.urlencoded({extended:true}));
webserver.use(bodyParser.json());       // данные запросов будут в JSON-формате

function reportServerError(error,res) {
    res.status(500).end(); // в прод-режиме нельзя отсылать на клиент подробности ошибки!
    logLineAsync(logFN,error);
}

function reportRequestError(error,res) {
    res.status(400).end();
    logLineAsync(logFN,error);
}

// READ
webserver.get('/groups', (req, res) => { 
    console.log('get (read) called');

    let connection=null;
    try {
        connection = mysql.createConnection(connectionConfig); // в каждом обработчике express устанавливаем с MySQL новое соединение!
        connection.connect();
        connection.query(`
            select id, name, lessons_start_dat 
            from grups
        ;`, (error, results, fields) => {
            if (error) {
                // здесь нет смысла делать throw, т.к. это коллбек, он выполняется не внутри try
                reportServerError(error,res);
            }
            else {
                // в results в полях lessons_start_dat сейчас дата, если её запаковать в JSON - получится строка, это неэкономно
                // СОГЛАШЕНИЕ: дату передаём в обе стороны в виде количества секунд
                let pureResults=results.map( row => ({ id: row.id, name: row.name, lessons_start_dat: Math.round(row.lessons_start_dat/1000) }) );
                res.send(pureResults); // если в send передаётся хэш - он автоматом переводится в JSON и ответу выставляется соответствующий Content-Type
            }
            connection.end();
        });
    }
    catch ( error ) {
        // этот catch словит ошибки, которые могут возникнуть при createConnection или connect, но не ошибки возникшие при выполнении SQL-запроса
        reportServerError(error,res);
        if ( connection )
            connection.end();
    }
});

// READ
webserver.get('/group/:groupname', (req, res) => { 
    console.log('get filtered (read) called');

    let connection=null;
    try {
        connection = mysql.createConnection(connectionConfig);
        connection.connect();
        // никогда не подставляем прямо в ТЕКСТ SQL-запроса полученные из сети данные!
        connection.query(`
            select id, name, lessons_start_dat 
            from grups
            where name=?
        ;`, [req.params.groupname], // каждый элемент этого массива будет безопасно подставлен вместо соответствующего знака ? в SQL-запросе
        (error, results, fields) => {
            if (error) {
                reportServerError(error,res);
            }
            else {
                let pureResults=results.map( row => ({ id: row.id, name: row.name, lessons_start_dat: Math.round(row.lessons_start_dat/1000) }) );
                res.send(pureResults);
            }
            connection.end();
        });
    }
    catch ( error ) {
        reportServerError(error,res);
        if ( connection )
            connection.end();    
    }
});

// CREATE
webserver.post('/groups', (req, res) => { 
    console.log('post (create) called');

    // забираем данные из тела запроса, заодно избавляемся от соглашений по датам
    // этот кусочек кода заодно неплохо документирует, что мы ожидаем в теле запроса
    const name=req.body.name;
    const lessons_start_dat=req.body.lessons_start_dat ? new Date(req.body.lessons_start_dat*1000) : null;
    // id не передаётся - мы же добавляем НОВУЮ группу, id будет назначен MySQL-сервером!

    // обязательно валидируем входные данные!
    let validationOk=true;
    try {
        if ( name.length>100 ) {
            throw new Error("POST /groups - слишком длинное название группы - "+name);
        }
        // if ( ... ) другие проверки, любые ошибки словит catch
    }
    catch ( error ) {
        reportRequestError(error,res);
        validationOk=false;
    }

    if ( validationOk ) {
        let connection=null;
        try {
            connection = mysql.createConnection(connectionConfig);
            connection.connect();
            connection.query(`
                insert into grups(name,lessons_start_dat)
                values (?,?)
            ;`, [name,lessons_start_dat],
            (error, results, fields) => {
                if (error) {
                    reportServerError(error,res);
                }
                else {

                    // надо узнать идентификатор, присвоенный добавленной группе
                    // его можно узнать запросом select last_insert_id()
                    connection.query(`select last_insert_id() as id;`, (error, results, fields) => {
                        if (error) {
                            reportServerError(error,res);
                        }
                        else {
                            const newGroupId=results[0].id;
                            console.log('new group created, id='+newGroupId);
                            res.send(newGroupId.toString()); // возвращаем в качестве ответа id добавленной записи; обязательно приводим к строке, иначе send считает что это HTTP-код ответа
                        }
                        connection.end();
                    });                

                }

            });
        }
        catch ( error ) {
            reportServerError(error,res);
            if ( connection )
                connection.end();    
        }
    }
});

// UPDATE
webserver.put('/groups', (req, res) => { 
    console.log('put (update) called');
    // от PUT ожидается, что если такой строки нет - она будет добавлена, а если есть - она будет обновлена
    // но, в общем, нам решать; мы будем делать именно обновление строки

    // можно было передавать id не в теле запроса а в УРЛе:
    // webserver.put('/groups/:groupid' ...

    const id=req.body.id;
    const name=req.body.name;
    const lessons_start_dat=req.body.lessons_start_dat ? new Date(req.body.lessons_start_dat*1000) : null;

    let validationOk=true;
    try {
        if ( name.length>100 ) {
            throw new Error("PUT /groups - слишком длинное название группы - "+name);
        }
    }
    catch ( error ) {
        reportRequestError(error,res);
        validationOk=false;
    }

    if ( validationOk ) {
        let connection=null;
        try {
            connection = mysql.createConnection(connectionConfig);
            connection.connect();
            connection.query(`
                update grups set name=?, lessons_start_dat=?
                where id=?
            ;`, [name,lessons_start_dat,id],
            (error, results, fields) => {
                if (error) {
                    reportServerError(error,res);
                }
                else {
                    // можно здесь запросом select row_count() получить количество изменённых строк, по идее должно быть ровно 1
                    // если их 0 - возможно был передан id несуществующей группы, но возможно мы обновили все поля группы на те же значения что были раньше
                    res.send("");
                    connection.end();
                    console.log('group updated, id='+id);
                }
            });
        }
        catch ( error ) {
            reportServerError(error,res);
            if ( connection )
                connection.end();    
        }
    }
});

// DELETE
webserver.delete('/groups', (req, res) => { 
    console.log('delete (delete) called');

    // можно было передавать id не в теле запроса а в УРЛе:
    // webserver.delete('/groups/:groupid' ...

    const id=req.body.id;

    let connection=null;
    try {
        connection = mysql.createConnection(connectionConfig);
        connection.connect();
        connection.query(`delete from grups where id=?;`, [id],
        (error, results, fields) => {
            if (error) {
                reportServerError(error,res);
            }
            else {
                // можно здесь запросом select row_count() получить количество изменённых (т.е. удалённых) строк, должно быть ровно 1
                // если их 0 - видимо был передан id несуществующей группы
                res.send("");
                connection.end();
                console.log('group deleted, id='+id);
            }
        });
    }
    catch ( error ) {
        reportServerError(error,res);
        if ( connection )
            connection.end();    
    }
    
});

webserver.use(
    express.static(path.resolve(__dirname,"static"))
);

webserver.listen(port);
logLineAsync(logFN,"web server running on port "+port);
