const express = require('express');

const webserver = express(); // создаём веб-сервер

const port = 3050;

webserver.get('/service1', (req, res) => { 
    // при обращении по этому УРЛу - просто отдаём строку
    console.log('service1 called');
    res.send("service1 ok!");
});

webserver.get('/service2', (req, res) => { 
    // при обращении по этому УРЛу - ответ зависит от GET-параметров
    console.log('service2 called, req.query=',req.query);
    res.send("service2 ok, par1="+req.query.par1+" par2="+req.query.par2);
});

webserver.get('/service2b/:par1/:par2', (req, res) => { 
    // при обращении по этому УРЛу - ответ зависит от частей URI запроса
    console.log('service2b called, req.params=',req.params);
    res.send("service2b ok, par1="+req.params.par1+" par2="+req.params.par2);
});

webserver.get('/service3', (req, res) => { 
    // при обращении по этому УРЛу - ответ всегда ошибка 401
    console.log('service3 called');
    res.status(401).end();
});

webserver.get('/service4', (req, res) => { 
    // при обращении по этому УРЛу - ответ всегда ошибка 401 и в качестве тела ответа - текст ошибки
    console.log('service4 called');
    res.status(401).send("sorry, access denied!");
});

webserver.get('/service5', (req, res) => { 
    // при обращении по этому УРЛу - ответа просто не будет
    console.log('service5 called');
});

webserver.listen(port); // просим веб-сервер слушать входящие HTTP-запросы на этом порту
console.log("web server running on port "+port);
