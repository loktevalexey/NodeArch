const express = require('express');
const path = require('path');

const { logLineSync } = require('../../utils/utils');

const webserver = express();

const port = 3560;
const logFN = path.join(__dirname, '_server.log');

webserver.get('/service1', (req, res) => { 
    logLineSync(logFN,`[${port}] `+"service1 called");

    res.setHeader("Content-Type", "text/html");

    res.send("hello <b>goodbye</b>");
});

webserver.get('/service2', (req, res) => { 
    logLineSync(logFN,`[${port}] `+"service2 called");

    res.setHeader("Content-Disposition", "inline");
    res.setHeader("Content-Type", "text/html");

    res.send("hello <b>goodbye</b>");
});

webserver.get('/service3', (req, res) => { 
    logLineSync(logFN,`[${port}] `+"service3 called");

    res.setHeader("Content-Disposition", "attachment");
    res.setHeader("Content-Type", "text/html");

    res.send("hello <b>goodbye</b>");
});

webserver.get('/service4', (req, res) => { 
    logLineSync(logFN,`[${port}] `+"service3 called");

    res.setHeader("Content-Disposition", 'attachment; filename="fff.html"');
    res.setHeader("Content-Type", "text/html");

    res.send("hello <b>goodbye</b>");
});

webserver.listen(port,()=>{
    logLineSync(logFN,"web server running on port "+port);
});
