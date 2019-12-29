const path = require('path');
const express = require('express');
const multer = require('multer');
const progress = require('progress-stream');

const { logLineSync } = require('../../utils/utils');

const webserver = express();

webserver.use(express.urlencoded({extended:true}));

// миддлварь для работы с multipart/form-data; если потребуется сохранение загруженных файлов - то в папку uploads
const upload = multer( { dest: path.join(__dirname,"uploads") } ); 

const port = 3550;
const logFN = path.join(__dirname, '_server.log');

webserver.get('/service1', (req, res) => { 
    logLineSync(logFN,`[${port}] `+"service1 called");

    // этот сервис ожидает данных формы в формате application/x-www-form-urlencoded

    console.log("request params",req.query);

    res.setHeader("Access-Control-Allow-Origin","*"); // нужно, т.к. мы к этому сервису и через AJAX будем обращаться
    res.send("ok login="+req.query.login);
});

webserver.post('/service2', (req, res) => { 
    logLineSync(logFN,`[${port}] `+"service2 called");

    // этот сервис ожидает данных формы в формате application/x-www-form-urlencoded

    console.log("request post data",req.body);

    res.setHeader("Access-Control-Allow-Origin","*"); // нужно, т.к. мы к этому сервису и через AJAX будем обращаться
    res.send("ok login="+req.body.login);
});

webserver.post('/service3', upload.none(), (req, res) => { // миддлварь, просто разбирающая данные формы в формате multipart/form-data
    logLineSync(logFN,`[${port}] `+"service3 called");

    console.log("request post data",req.body);
    
    res.send("ok login="+req.body.login);
});

// миддлварь, разбирающая данные формы в формате multipart/form-data и сохраняющая файл, прилетевший под именем photo
const service4files = upload.fields( [ {name:'photo', maxCount:1} ] ); 
webserver.post('/service4', service4files, (req, res) => { 
    logLineSync(logFN,`[${port}] `+"service4 called");

    console.log("request post data",req.body);
    console.log("request files",req.files); // req.files заполнила миддлварь upload.fields
    
    res.send("ok login="+req.body.login);
});

// multer не позволяет отслеживать прогресс приёма+сохранения файла
// есть пакет progress-stream, он по сути прозрачно становится между req и multer, 
// но предоставляет событие progress, позволяющее отследить прогресс передачи данных от req к multer
// важно: progress-stream будет отслеживать процесс передачи ВСЕГО тела запроса, а не именно файла
// а в теле запроса, кроме photo, у нас ещё login и password
const service5file = upload.single('photo');
webserver.post('/service5', (req, res) => { 
    var fileProgress = progress();
    const fileLength = req.headers['content-length']; // вообще-то длина тела запроса не равна длине файла, но примерно - да

    req.pipe(fileProgress); // поток с телом запроса направляем в progress
    fileProgress.headers = req.headers; // и ставим в progress те же заголовки что были у req

    fileProgress.on('progress', info => {
        console.log('loaded '+info.transferred+' bytes of '+fileLength);
    });

    service5file(fileProgress, res, async (err) => {
        if (err) return res.status(500);
        console.log('file saved, origin filename='+fileProgress.file.originalname+', store filename='+fileProgress.file.filename);
        res.send("ok login="+fileProgress.body.login);
    });

});

webserver.listen(port,()=>{
    logLineSync(logFN,"web server running on port "+port);
});
