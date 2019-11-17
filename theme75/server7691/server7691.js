const express = require('express');
const path = require('path');
const fsp = require('fs').promises;

const { logLineAsync } = require('../../utils/utils');

const webserver = express();

const port = 7691;
const logFN = path.join(__dirname, '_server.log');

webserver.get('/getsportpage/:sportname', async function (req, res) {
    logLineAsync(logFN,`[${port}] url=${req.originalUrl} sportname=${req.params.sportname}`);
    
    let fileContents=await fsp.readFile(path.join(__dirname, '..','site_football3','page_pattern.html'),"utf8");
    fileContents=fileContents.split("$$$SPORT$$$").join(req.params.sportname);
    fileContents=fileContents.split("$$$TIME$$$").join((new Date()).toLocaleString());

    res.send(fileContents);
});

webserver.listen(port,()=>{
    logLineAsync(logFN,"web server running on port "+port);
});
