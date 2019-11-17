// запускать, передавая первым аргументом номер порта - 7631 или 7632
const express = require('express');
const path = require('path');
const fsp = require('fs').promises;

const { logLineAsync } = require('../../utils/utils');

const webserver = express();

const port = parseInt(process.argv[2]);
const logFN = path.join(__dirname, '_server.log');

webserver.get('/getsportpage/:sportname', async function (req, res) {
    logLineAsync(logFN,`[${port}] url=${req.originalUrl} sportname=${req.params.sportname}`);
    
    const fileContents=await fsp.readFile(path.join(__dirname, '..','site_football2','page_pattern.html'),"utf8");

    res.send(fileContents.split("$$$SPORT$$$").join(req.params.sportname));
});

webserver.listen(port,()=>{
    logLineAsync(logFN,"web server running on port "+port);
});
