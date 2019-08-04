const express = require('express');
const path = require('path');

const { logLineSync } = require('../../utils/utils');

const webserver = express();

webserver.use(express.urlencoded({extended:true}));

const port = 3538;
const logFN = path.join(__dirname, '_server.log');

webserver.get('/service5', (req, res) => { 
    logLineSync(logFN,"service5 called");

    // т.к. к этому сервису идёт AJAX-запрос со страниц с другим происхождением (origin), надо явно это разрешить
    res.setHeader("Access-Control-Allow-Origin","*"); 

    console.log("request headers",req.headers);
    const clientAccept=req.headers.accept;
    if ( clientAccept==="application/json" ) {
        res.setHeader("Content-Type", "application/json");
        res.send({count:5,price:777});
    }
    else if ( clientAccept==="application/xml" ) {
        res.setHeader("Content-Type", "application/xml");
        res.send("<busket><count>5</count><price>777</price></busket>");
    }
    else {
        res.setHeader("Content-Type", "text/plain");
        res.send("count=5 price=777");
    }
});

webserver.listen(port);
logLineSync(logFN,"web server running on port "+port);
