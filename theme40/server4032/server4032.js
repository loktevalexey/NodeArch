const express = require('express');
const path = require('path');

const webserver = express();

const port = 4032;

webserver.use(
    "/mysite",
    express.static(path.resolve(__dirname,"../site_football"))
);

webserver.listen(port);
