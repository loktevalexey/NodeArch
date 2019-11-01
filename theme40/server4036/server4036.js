﻿const express = require('express');
const path = require('path');
const fs = require('fs');
const Jimp = require('jimp');

const { logLineAsync } = require('../../utils/utils');

const webserver = express();

const port = 4036;
const logFN = path.join(__dirname, '_server.log');

// промисифицированная версия fs.stat
const statPromise = path => {
    return new Promise( (resolve,reject) => {
        fs.stat(path,(err,stats) => {
            if ( err )
                reject(err);
            else  
                resolve(stats);      
        });
    } );
};

webserver.use(
    "/image",
    express.static(path.resolve(__dirname,"images_full"))
);

webserver.get(/^\/image\/(([a-zA-Z\d]+)_thumb\.(jpg|jpeg|gif|png))$/, async (req, res) => {

    // попадающие сюда УРЛы попадают также и в предыдущий обработчик
    // и если он нашёл файл с таким именем в папке images_full - он его возвращает клиенту и цепочка обработчиков прерывается
    // а если не нашёл - цепочка обработчиков продолжается и мы попадаем сюда

    const fullFileName=req.params[0]; // если УРЛ для обработчика задан регуляркой, то в req.params попадает каждая скобочная группа из регулярки
    const fileNameOnly=req.params[1];
    const fileExtName=req.params[2];
    logLineAsync(logFN,`пришёл запрос на автоуменьшенную картинку, полное имя файла = ${fullFileName}, имя исходного файла = ${fileNameOnly}, расширение исходного файла = ${fileExtName}`);

    const thumbPFN=path.resolve(__dirname,"images_thumb",fullFileName);

    // сначала проверим, может маленькая картинка уже готовая лежит в папке images_thumb
    try {
        const stats=await statPromise(thumbPFN);
        if ( stats.isFile() ) {
            logLineAsync(logFN,`есть готовая маленькая картинка ${fullFileName}, отдаём её`);
            res.sendFile( thumbPFN );
        }   
        else {
            res.status(403).end(); // картинка есть, но она не файл, что-то пошло не так, вернём 403 - запрещено
        }
    }
    catch ( err ) {
        logLineAsync(logFN,`нет готовой маленькой картинки ${fullFileName}, будем сжимать большую и сохранять результат на будущее`);

        const originPFN=path.resolve(__dirname,"images_full",`${fileNameOnly}.${fileExtName}`);
        let compressStartDT=new Date();
        await compressImage(originPFN,thumbPFN,300);
        let compressDurationMS=(new Date())-compressStartDT;
        logLineAsync(logFN,`сохранена маленькая картинка ${fullFileName}, сжатие заняло ${compressDurationMS} мс`);
        
        res.sendFile( thumbPFN );
    }

});

webserver.listen(port);
logLineAsync(logFN,"web server running on port "+port);

// масштабирует картинку из sourcePFN в resultPFN с указанной шириной с сохранением пропорций
async function compressImage(sourcePFN, resultPFN, newWidth) {

    let result = await Jimp.read(sourcePFN);
    const {width, height} = result.bitmap; // это размеры большой картинки

    let ratio = width/newWidth;
    let newHeight = height/width*newWidth; // ширину маленькой картинки знаем, вычисляем высоту маленькой

    result.resize(newWidth, newHeight);
    result.quality(100);
    await result.writeAsync(resultPFN);
}