const express = require('express');
const path = require('path');
const fs = require('fs');

const { logLineSync } = require('../../utils/utils');

const webserver = express();

const port = 4032;
const logFN = path.join(__dirname, '_server.log');

//webserver.get("/mysite/*", (req, res) 

webserver.use(
    "/mysite",
    express.static(path.resolve(__dirname,"../site_football"))
);

webserver.listen(port);
logLineSync(logFN,"web server running on port "+port);
