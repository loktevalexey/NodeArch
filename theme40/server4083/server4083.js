const express = require('express');
const path = require('path');

const { logLineAsync } = require('../../utils/utils');

const webserver = express();

const port = 4083;
const logFN = path.join(__dirname, '_server.log');

webserver.get('/getdataasync', (req, res) => { 
    logLineAsync(logFN,"getdataasync called");

    res.sendFile( path.resolve(__dirname,"../site_football/stats.json") );
});

webserver.listen(port);
logLineAsync(logFN,"web server running on port "+port);
