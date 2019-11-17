const express = require('express');
const path = require('path');
const fs = require('fs');

const { logLineSync } = require('../../utils/utils');

const webserver = express();

const port = 4082;
const logFN = path.join(__dirname, '_server.log');

webserver.get('/getdatasync', (req, res) => { 
    logLineSync(logFN,`[${port}] `+"getdatasync called");

    let txt=fs.readFileSync(path.resolve(__dirname,"../site_football/stats.json"),"utf8");
    res.setHeader("Content-Type", "application/json");
    res.send(txt);
});

webserver.listen(port,()=>{
    logLineSync(logFN,"web server running on port "+port);
});
