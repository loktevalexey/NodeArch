const express = require('express');
const path = require('path');

const webserver = express();

const port = 3580;

webserver.use(
    express.static(path.resolve(__dirname,"static"))
);

webserver.listen(port);
