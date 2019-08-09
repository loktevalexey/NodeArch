const express = require('express');
const path = require('path');
const fs = require('fs');

const { logLineSync } = require('../../utils/utils');

const webserver = express();

const port = 4022;
const logFN = path.join(__dirname, '_server.log');

webserver.get("/mysite/*", (req, res) => { 
    logLineSync(logFN,"static server called, originalUrl="+req.originalUrl);

    const filePath=path.join(__dirname,"site",req.originalUrl.substring(8));

    try {
        const stats=fs.statSync(filePath);
        if ( stats.isFile() ) {
            console.log("отдаём файл",filePath);
            const fileStream=fs.createReadStream(filePath);
            fileStream.pipe(res);
        }   
        else {
            console.log("запрошена папка",filePath);
            res.status(403).send(""); // это папка, вернём 403 - запрещено
        }
    }
    catch ( err ) {
        console.log("ошибка проверки файла",filePath,err.code);
        res.status(404).send(""); // будем думать что может быть только одна ошибка - файл не найден
    }

});

webserver.listen(port);
logLineSync(logFN,"web server running on port "+port);
