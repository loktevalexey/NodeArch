const express = require('express');
const path = require('path');

const { logLineAsync } = require('../../utils/utils');

const webserver = express();

const port = 4530;
const logFN = path.join(__dirname, '_server.log');

webserver.use(function (req, res, next) {
    logLineAsync(logFN,`[${port}] `+"static server called, originalUrl="+req.originalUrl);
    next();
});

webserver.use(
    express.static(path.resolve(__dirname,"static"))
);

webserver.listen(port);
logLineAsync(logFN,"web server running on port "+port);
