const express = require('express');
const fs = require('fs');
const os = require('os');

// пишет строку в файл лога и одновременно в консоль
// origin - программа или модуль, который выводит строку
function logLineSync(logFilePath,logLine) {
    const logDT=new Date();
    let time=logDT.toLocaleDateString()+" "+logDT.toLocaleTimeString();
    let fullLogLine=time+" "+logLine;

    console.log(fullLogLine); // выводим сообщение в консоль

    const logFd = fs.openSync(logFilePath, 'a+'); // и это же сообщение добавляем в лог-файл
    fs.writeSync(logFd, fullLogLine + os.EOL); // os.EOL - это символ конца строки, он разный для разных ОС
    fs.closeSync(logFd);
}

const webserver = express();

webserver.use(express.urlencoded({extended:true}));

const port = 3070;

webserver.get('/service1', (req, res) => { 
    // при обращении по этому УРЛу - просто отдаём строку
    logLineSync('_server.log','service1 called');
    res.send("service1 ok!");
});

webserver.get('/service2', (req, res) => { 
    // при обращении по этому УРЛу - ответ зависит от GET-параметров
    logLineSync('_server.log',"service2 called, get pars: "+JSON.stringify(req.query));
    res.setHeader("X-XSS-Protection", "0"); // добавляем в ответ заголовок, иначе неинтересно
    res.send("service2 ok, par1="+req.query.par1+" par2="+req.query.par2);
});

webserver.get('/service3', (req, res) => { 
    // при обращении по этому УРЛу - ответ всегда ошибка 401
    logLineSync('_server.log','service3 called');
    res.status(401).end();
});

webserver.get('/service4', (req, res) => { 
    // при обращении по этому УРЛу - ответ всегда ошибка 401 и в качестве тела ответа - текст ошибки
    logLineSync('_server.log','service4 called');
    res.status(401).send("sorry, access denied!");
});

webserver.get('/service5', (req, res) => { 
    // при обращении по этому УРЛу - ответа просто не будет
    logLineSync('_server.log','service5 called');
});

webserver.post('/service6', (req, res) => { 
    // при обращении по этому УРЛу - ответ зависит от POST-данных
    // миддлварь urlencoded раскодировала данные POST-запроса и положила в req.body
    logLineSync('_server.log','service6 called, req.body: '+JSON.stringify(req.body));
    res.send("service6 ok, login="+req.body.login+" age="+req.body.age);
});

webserver.listen(port);
logLineSync('_server.log',"web server running on port "+port);
