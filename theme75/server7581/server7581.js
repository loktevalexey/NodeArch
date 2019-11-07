const express = require('express');
const path = require('path');
const fsp = require('fs').promises;

const { logLineAsync } = require('../../utils/utils');

const webserver = express();

const port = 7581;
const logFN = path.join(__dirname, '_server.log');

webserver.get('/getsportpage/:sportname', async function (req, res) {
    logLineAsync(logFN,`[${port}] url=${req.originalUrl} sportname=${req.params.sportname}`);
    
    const fileContents=await fsp.readFile(path.join(__dirname, '..','site_football2','page_pattern.html'),"utf8");

    res.send(fileContents.split("$$$SPORT$$$").join(req.params.sportname));
});

webserver.listen(port);
logLineAsync(logFN,"web server running on port "+port);
