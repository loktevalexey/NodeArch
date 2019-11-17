const express = require('express');
const path = require('path');

const { logLineSync } = require('../../utils/utils');

const webserver = express();

const port = 4033;
const logFN = path.join(__dirname, '_server.log');

webserver.use(function (req, res, next) {
    // эту мидлварь добавляем ТОЛЬКО для логгирования, т.к. сам express.static не ведёт логи
    logLineSync(logFN,`[${port}] `+"static server called, originalUrl="+req.originalUrl);
    next();
});

webserver.use(
    "/mysite",
    express.static(path.resolve(__dirname,"../site_football"))
);

webserver.listen(port,()=>{
    logLineSync(logFN,"web server running on port "+port);
});
