const express = require('express');
const path = require('path');

const { logLineSync } = require('../../utils/utils');

const webserver = express();

const port = 4052;
const logFN = path.join(__dirname, '_server.log');

webserver.use(function (req, res, next) {
    logLineSync(logFN,"static server called, originalUrl="+req.originalUrl);
    next();
});

webserver.get("/main1.html", function (req, res) {
    logLineSync(logFN,"root URL, permanently redirecting...");
    res.redirect(301,'/mysite/page.html')
});

webserver.get("/main2.html", function (req, res) {
    logLineSync(logFN,"root URL, temporarily redirecting...");
    res.redirect(302,'/mysite/page.html')
});

webserver.use(
    "/mysite",
    express.static(path.resolve(__dirname,"../site_football"))
);

webserver.listen(port);
logLineSync(logFN,"web server running on port "+port);
