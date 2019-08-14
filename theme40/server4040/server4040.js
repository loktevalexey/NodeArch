const express = require('express');
const path = require('path');

const { logLineSync } = require('../../utils/utils');

const webserver = express();

const port = 4040;
const logFN = path.join(__dirname, '_server.log');

webserver.use(function (req, res, next) {
    logLineSync(logFN,"static server called, originalUrl="+req.originalUrl);
    next();
});

webserver.use(function(req, res, next) {
    if ( req.path==="/mysite/file1.jpg" ) {
        logLineSync(logFN,"sending file...");
        res.setHeader("Content-Disposition","attachment");
        res.download(path.resolve(__dirname,"../site_football/football.jpg"));
    } 
    else if ( req.path==="/mysite/file2.jpg" ) {
        logLineSync(logFN,"sending file...");
        res.setHeader("Content-Disposition","attachment");
        res.download(path.resolve(__dirname,"../site_football/football.jpg"),"download_file2.jpg");
    } 
    else
        next();
});
  
webserver.use(
    "/mysite",
    express.static(path.resolve(__dirname,"../site_football"))
);

webserver.listen(port);
logLineSync(logFN,"web server running on port "+port);
