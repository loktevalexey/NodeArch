const express = require('express');
const path = require('path');
const fetch = require("isomorphic-fetch");

const { logLineAsync } = require('../../utils/utils');

const webserver = express();

const port = 4510;

const logFN = path.join(__dirname, '_server.log');

webserver.get('/service1/:aaa', (req, res) => { 
    logLineAsync(logFN,'вызван service1, aaa='+req.params.aaa);
    res.send("service1 aaa="+req.params.aaa);
});

webserver.get('/service2/:aaa', async (req, res) => { 
    logLineAsync(logFN,'вызван service2, aaa='+req.params.aaa+'; проксируем...');

    const proxy_response=await fetch(`http://nodearch.e-learning.by:3050/service2?par1=${req.params.aaa}&par2=777`);
    const proxy_text=await proxy_response.text();

    res.send(proxy_text);
});

webserver.listen(port);
logLineAsync(logFN,"web server running on port "+port);
