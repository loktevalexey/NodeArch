const express = require('express');
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

            let fileModDT=new Date(stats.birthtimeMs);
            let lastModifiedStr=fileModDT.toUTCString();

            let ETag="$$$"+fileName+"$$$"; // чисто для демонстрации; ETag следует считать как CRC от содержимого файла

            let ifNoneMatch=req.header("If-None-Match");
            let ifModifiedSince=req.header("If-Modified-Since");
            if ( ifNoneMatch && (ifNoneMatch===ETag) ) {
                console.log("отдаём 304 т.к. If-None-Match совпал с ETag");
                res.status(304).send(""); // в кэше браузера - годная версия, пусть её использует
            }
            else if ( ifModifiedSince && (ifModifiedSince===lastModifiedStr) ) {
                console.log("отдаём 304 т.к. If-Modified-Since совпал с датой изменения файла");
                res.status(304).send(""); // в кэше браузера - годная версия, пусть её использует
            }
            else {
                if ( /\.html$/.test(filePath) )
                    res.setHeader("Content-Type", "text/html");
                else if ( /\.jpg$/.test(filePath) )
                    res.setHeader("Content-Type", "image/jpeg");
                else if ( /\.css$/.test(filePath) )
                    res.setHeader("Content-Type", "text/css");
            
                res.setHeader("Last-Modified",lastModifiedStr);
                res.setHeader("ETag",ETag);
                res.setHeader("Cache-Control","public, max-age=60"); // ответ может быть сохранён любым кэшем, в т.ч. кэшем браузера, на 1 минуту
                //res.setHeader("Expires", new Date(Date.now() + 60*1000).toUTCString()); // (устаревший подход) ответ будет сохранён в кэш на 1 минуту
                // или если кэширование не требуется:
                // res.setHeader("Cache-Control","no-cache"); // всегда отправлять на сервер запрос на ревалидацию прокисшего закэшированного ответа
                // res.setHeader("Expires","0"); // (устаревший подход) невалидная дата - ответ в кэш браузера будет сохранён сразу как прокисший
                
                console.log("отдаём файл",filePath);
                const fileStream=fs.createReadStream(filePath);
                fileStream.pipe(res);
            }
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
