const express = require('express');
const path = require('path');

const { logLineSync } = require('../../utils/utils');

const webserver = express();

const port = 4035;
const logFN = path.join(__dirname, '_server.log');

webserver.use(function (req, res, next) {
    logLineSync(logFN,`[${port}] `+"static server called, originalUrl="+req.originalUrl);
    next();
});

webserver.use(function(req, res, next) {
    if ( /\.html$/.test(req.path) ) {
      //res.charset = "windows-1251"; это не работает!
      res.setHeader("Content-Type","text/html; charset=windows-1251");
    }
    next(); // это миддлварь - продолжаем обработку запроса
});
  
webserver.use(
    "/mysite",
    express.static(path.resolve(__dirname,"../site_football"))
);

webserver.listen(port,()=>{
    logLineSync(logFN,"web server running on port "+port);
});
