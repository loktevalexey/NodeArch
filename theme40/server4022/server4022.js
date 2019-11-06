const express = require('express');
const path = require('path');
const fs = require('fs');
const querystring = require('querystring');

const { logLineSync } = require('../../utils/utils');

const webserver = express();

const port = 4022;
const logFN = path.join(__dirname, '_server.log');

webserver.get("/mysite/*", (req, res) => { 

    // мы будем часть "сырого" УРЛа (req.originalUrl) использовать как имя файла
    // но в УРЛе пробелы, русские буквы и другие символы url-кодируются (из " " получается "%20", из "п" - "%D0%BF")
    // а в именах файлов такое кодирование не применяется
    // в браузере декодирование из УРЛ-формата в обычную строку делается вызовом urldecode
    // под Node.js - вызовом querystring.unescape
    // в req.params (данные из частей УРЛа), req.query (get-данные), req.body (post-данные) это декодирование уже сделано
    const originalUrlDecoded=querystring.unescape(req.originalUrl);
    logLineSync(logFN,`[${port}] `+"static server called, originalUrl="+req.originalUrl+", originalUrlDecoded="+originalUrlDecoded);

    const filePath=path.resolve(__dirname,"../site_football",originalUrlDecoded.substring(8));

    try {
        const stats=fs.statSync(filePath);
        if ( stats.isFile() ) {
            console.log("отдаём файл",filePath);
            const fileStream=fs.createReadStream(filePath);
            fileStream.pipe(res);
        }   
        else {
            console.log("запрошена папка",filePath);
            res.status(403).end(); // это папка, вернём 403 - запрещено
        }
    }
    catch ( err ) {
        console.log("ошибка проверки файла",filePath,err.code);
        res.status(404).end(); // будем думать что может быть только одна ошибка - файл не найден
    }

});

webserver.listen(port);
logLineSync(logFN,"web server running on port "+port);
