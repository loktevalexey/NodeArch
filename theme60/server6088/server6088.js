const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mysql=require("mysql");

const { logLineAsync } = require('../../utils/utils');
const { newConnectionFactory, selectQueryFactory, modifyQueryFactory, getLastInsertedId, getModifiedRowsCount } = require("./db_utils");

const poolConfig={
    connectionLimit : 2,      // полагаем что БД выдержит 2 соединения, т.е. в пуле будет максимум 2 соединения
    host     : 'localhost',   // на каком компьютере расположена база данных
    user     : 'nodeuser',    // каким пользователем подключаемся (на учебном сервере - "root")
    password : 'nodepass',    // каким паролем подключаемся (на учебном сервере - "1234")
    database : 'learning_db', // к какой базе данных подключаемся
};
let pool = mysql.createPool(poolConfig);

const webserver = express();
var groupsRouter = express.Router();

const port = 6088;
const logFN = path.join(__dirname, '_server.log');

// webserver.use(express.urlencoded({extended:true}));
webserver.use(bodyParser.json());       // данные запросов будут в JSON-формате

function reportServerError(error,res) {
    res.status(500).end();
    logLineAsync(logFN,`[${port}] `+error);
}

function reportRequestError(error,res) {
    res.status(400).end();
    logLineAsync(logFN,`[${port}] `+error);
}

// все обработчики добавляем в groupsRouter а не прямо в webserver

// READ
groupsRouter.get('/groups', async (req, res) => { 
    console.log('get (read) called');

    let connection=null;
    try {
        connection=await newConnectionFactory(pool,res);

        let groups = await selectQueryFactory(connection, `
            select id, name, lessons_start_dat 
            from grups
        ;`, []);

        groups=groups.map( row => ({ id: row.id, name: row.name, lessons_start_dat: Math.round(row.lessons_start_dat/1000) }) );

        res.send(groups);

    }
    catch ( error ) {
        reportServerError(error,res); // сюда прилетят любые ошибки
    }
    finally {
        if ( connection )
            connection.release(); // соединение надо закрыть (вернуть в пул) независимо от успеха/ошибки
    }
});

// READ
groupsRouter.get('/group/:groupname', async (req, res) => { 
    console.log('get filtered (read) called');

    let connection=null;
    try {
        connection=await newConnectionFactory(pool,res);

        let groups = await selectQueryFactory(connection, `
            select id, name, lessons_start_dat 
            from grups
            where name=?
        ;`, [req.params.groupname]);

        groups=groups.map( row => ({ id: row.id, name: row.name, lessons_start_dat: Math.round(row.lessons_start_dat/1000) }) );

        res.send(groups);

    }
    catch ( error ) {
        reportServerError(error,res);
    }
    finally {
        if ( connection )
            connection.release();
    }

});

// CREATE
groupsRouter.post('/groups', async (req, res) => { 
    console.log('post (create) called');

    const name=req.body.name;
    const lessons_start_dat=req.body.lessons_start_dat ? new Date(req.body.lessons_start_dat*1000) : null;

    let validationOk=true;
    try {
        if ( name.length>100 ) {
            throw new Error("POST /groups - слишком длинное название группы - "+name);
        }
    }
    catch ( error ) {
        reportRequestError(error,res);
        validationOk=false;
    }

    if ( validationOk ) {

        let connection=null;
        try {
            connection=await newConnectionFactory(pool,res);
    
            await modifyQueryFactory(connection, `
                insert into grups(name,lessons_start_dat)
                values (?,?)
            ;`, [name,lessons_start_dat]);
    
            const newGroupId=await getLastInsertedId(connection);

            console.log('new group created, id='+newGroupId);
            res.send(newGroupId.toString());
        }
        catch ( error ) {
            reportServerError(error,res);
        }
        finally {
            if ( connection )
                connection.release();
        }

    }
});

// UPDATE
groupsRouter.put('/groups', async (req, res) => { 
    console.log('put (update) called');

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
            connection=await newConnectionFactory(pool,res);
    
            await modifyQueryFactory(connection, `
                update grups set name=?, lessons_start_dat=?
                where id=?
            ;`, [name,lessons_start_dat,id]);
    
            res.send("");
            console.log('group updated, id='+id);
        }
        catch ( error ) {
            reportServerError(error,res);
        }
        finally {
            if ( connection )
                connection.release();
        }

    }
});

// DELETE
groupsRouter.delete('/groups', async (req, res) => { 
    console.log('delete (delete) called');

    const id=req.body.id;


    let connection=null;
    try {
        connection=await newConnectionFactory(pool,res);

        await modifyQueryFactory(connection, `delete from grups where id=?;`, [id]);

        // а вот здесь нам совсем легко будет проверить, что удалена ровно 1 строка
        let deletedRows=await getModifiedRowsCount(connection);
        if ( deletedRows===1 ) {
            res.send("");
            console.log('group deleted, id='+id);
        }
        else {
            res.status(400).end();
            console.log('group not found, id='+id);
        }
    }
    catch ( error ) {
        reportServerError(error,res);
    }
    finally {
        if ( connection )
            connection.release();
    }
    
});

// а потом добавляем весь groupsRouter как ГРУППУ роутов к веб-серверу, добавляя к каждому роуту слева префикс /v0
// как говорят, монтируем роуты по базовому УРЛу /v0
webserver.use("/v0",groupsRouter);
// а вот так бы мы получили ровно те же УРЛы, что были в примере 6086
// webserver.use(groupsRouter);

webserver.use(
    express.static(path.resolve(__dirname,"static"))
);

webserver.listen(port);
logLineAsync(logFN,"web server running on port "+port);
