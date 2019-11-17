const express = require('express');

const webserver = express();

webserver.use(express.urlencoded({extended:true}));

const port = 3060;

webserver.get('/service1', (req, res) => { 
    // при обращении по этому УРЛу - просто отдаём строку
    // миддлварь urlencoded ничего не меняла, она реагирует на конкретный формат запроса - application/x-www-form-urlencoded
    console.log('service1 called');
    res.send("service1 ok!");
});

webserver.post('/service6', (req, res) => { 
    // при обращении по этому УРЛу - ответ зависит от POST-данных
    // миддлварь urlencoded раскодировала данные POST-запроса и положила в req.body
    console.log('service6 called, req.body=',req.body);
    res.send("service6 ok, login="+req.body.login+" age="+req.body.age);
});

webserver.listen(port,()=>{
    console.log("web server running on port "+port);
});
