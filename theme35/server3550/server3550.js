const express = require('express');
const multer = require('multer');
const path = require('path');

const { logLineSync } = require('../../utils/utils');

const webserver = express();

webserver.use(express.urlencoded({extended:true}));

// миддлварь для работы с multipart/form-data; если потребуется сохранение загруженных файлов - то в папку uploads
const upload = multer( { dest: path.join(__dirname,"uploads") } ); 

const port = 3550;
const logFN = path.join(__dirname, '_server.log');

webserver.get('/service1', (req, res) => { 
    logLineSync(logFN,"service1 called");

    // этот сервис ожидает данных формы в формате application/x-www-form-urlencoded

    console.log("request params",req.query);

    res.send("ok login="+req.query.login);
});

webserver.post('/service2', (req, res) => { 
    logLineSync(logFN,"service2 called");

    // этот сервис ожидает данных формы в формате application/x-www-form-urlencoded

    console.log("request post data",req.body);

    res.send("ok login="+req.body.login);
});

webserver.post('/service3', upload.none(), (req, res) => { // миддлварь, просто разбирающая данные формы в формате multipart/form-data
    logLineSync(logFN,"service3 called");

    console.log("request post data",req.body);
    
    res.send("ok login="+req.body.login);
});

// миддлварь, разбирающая данные формы в формате multipart/form-data и сохраняющая файл, прилетевший под именем photo
const service4files = upload.fields( [ {name:'photo', maxCount:1} ] ); 
webserver.post('/service4', service4files, (req, res) => { 
    logLineSync(logFN,"service4 called");

    console.log("request post data",req.body);
    console.log("request files",req.files); // req.files заполнила миддлварь upload.fields
    
    res.send("ok login="+req.body.login);
});

webserver.listen(port);
logLineSync(logFN,"web server running on port "+port);

