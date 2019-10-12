const express = require('express');
const path = require('path');

const { logLineAsync } = require('../../utils/utils');

const webserver = express();

const port = 4060;
const logFN = path.join(__dirname, '_server.log');

webserver.use(function (req, res, next) {
    // можно без await - нам же неважно, когда запись строки лога реально завершится
    logLineAsync(logFN,"static server called, originalUrl="+req.originalUrl);
    next();
});

webserver.use(
    "/mysite",
    express.static(path.resolve(__dirname,"../site_football"))
);

webserver.listen(port);
logLineAsync(logFN,"web server running on port "+port);
