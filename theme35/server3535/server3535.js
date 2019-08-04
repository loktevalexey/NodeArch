const express = require('express');
const path = require('path');

const { logLineSync } = require('../../utils/utils');

const webserver = express();

webserver.use(express.urlencoded({extended:true}));

const port = 3535;
const logFN = path.join(__dirname, '_server.log');

webserver.get('/service1', (req, res) => { 
    logLineSync(logFN,"service1 called, get pars: "+JSON.stringify(req.query));
    res.setHeader("Content-Type", "text/plain");
    res.send("service1 par1="+req.query.par1+" par2="+req.query.par2);
});

webserver.get('/service2', (req, res) => { 
    logLineSync(logFN,"service2 called, get pars: "+JSON.stringify(req.query));
    res.setHeader("Content-Type", "image/jpeg");
    res.send("service1 par1="+req.query.par1+" par2="+req.query.par2);
});

webserver.listen(port);
logLineSync(logFN,"web server running on port "+port);
