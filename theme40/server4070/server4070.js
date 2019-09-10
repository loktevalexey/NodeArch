const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const fs = require('fs');

const { logLineAsync } = require('../../utils/utils');

const webserver = express();

const port = 4070;
const logFN = path.join(__dirname, '_server.log');

// миддлварь для обработки данных формы в формате x-www-form-urlencoded
webserver.use(express.urlencoded({extended:true}));

// миддлварь для обработки заголовков запроса с куками
webserver.use(cookieParser());

// миддлварь для логгирования
webserver.use(function (req, res, next) {
    logLineAsync(logFN,"server called, originalUrl="+req.originalUrl);
    next();
});

webserver.get("/hello", (req, res) => { 
    // сюда придёт и пользователь без кука, и пользователь с куком
    console.log(req.cookies);
    if ( !req.cookies.username ) {
        logLineAsync(logFN,"пользователь новый, покажем ему страницу с вопросом об имени");

        const filePath=path.resolve(__dirname,"../site_cookies/new_user.html");
        sendPage(res,filePath);
    }
    else {
        logLineAsync(logFN,"пользователя мы уже знаем, покажем ему страницу об этом");

        const filePath=path.resolve(__dirname,"../site_cookies/known_user.html");
        sendPage(res,filePath);
    }
});

webserver.post("/remember", (req, res) => { 
    logLineAsync(logFN,"пользователь прислал своё имя - "+req.body.myname);
    logLineAsync(logFN,"покажем ему страницу со спасибо и поставим ему кук");

    res.cookie("username",req.body.myname); // важно - куки устанавливаются заголовками ответа, и любые заголовки должны быть посланы ДО тела ответа

    const filePath=path.resolve(__dirname,"../site_cookies/remembered_user.html");
    sendPage(res,filePath);
});

function sendPage(res,filePath) {
    logLineAsync(logFN,"отдаём файл "+filePath);
    res.sendFile(filePath);
}

webserver.listen(port);
logLineAsync(logFN,"web server running on port "+port);
