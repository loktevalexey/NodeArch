﻿const express = require('express');
const path = require('path');
const fs = require('fs');

const { logLineSync } = require('../../utils/utils');

const webserver = express();

const port = 4028;
const logFN = path.join(__dirname, '_server.log');

webserver.get("/mysite/*", (req, res) => { 
    logLineSync(logFN,"static server called, originalUrl="+req.originalUrl);

    const fileName=req.originalUrl.substring(8);
    const filePath=path.resolve(__dirname,"../site_football",fileName);

    try {
        const stats=fs.statSync(filePath);
        if ( stats.isFile() ) {
            console.log("отдаём файл",filePath);

            if ( /\.html$/.test(filePath) )
                res.setHeader("Content-Type", "text/html");

            let fileModDT=new Date(stats.birthtimeMs);
            res.setHeader("Last-Modified", fileModDT.toUTCString());

            res.setHeader("ETag","$$$"+fileName+"$$$");

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