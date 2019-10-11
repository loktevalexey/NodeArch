const express = require('express');
const fs = require('fs');
const path = require('path');
const os = require('os');

const webserver = express();

webserver.use(express.urlencoded({extended:true}));

const port = 3085;
const logFN = path.join(__dirname, '_server.log');

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

webserver.get('/service2', (req, res) => { 
    logLineSync(logFN,"service2 called, get pars: "+JSON.stringify(req.query));
    
    let par1=parseInt(req.query.par1)||0;
    let par2=escapeHTML(req.query.par2);

    if ( par1<=0 || par1>=10 ) {
        res.status(400).end();
    }
    else {
        res.send("service2 ok, par1="+par1+" par2="+par2);
    }
});

webserver.listen(port);
logLineSync(logFN,"web server running on port "+port);
logLineSync(logFN,"environment variable NODE_ENV is "+process.env.NODE_ENV);
logLineSync(logFN,"environment variable VAR1 is "+process.env.VAR1);

function escapeHTML(text) {
    if ( !text )
        return text;
    text=text.toString()
        .split("&").join("&amp;")
        .split("<").join("&lt;")
        .split(">").join("&gt;")
        .split('"').join("&quot;")
        .split("'").join("&#039;");
    return text;
}
