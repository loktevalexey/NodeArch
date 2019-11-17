const express = require('express');
const path = require('path');

const { logLineAsync } = require('../../utils/utils');

const webserver = express();

const port = 5633;
const logFN = path.join(__dirname, '_server.log');

webserver.use(
    express.static(path.resolve(__dirname,"static"))
);

webserver.listen(port,()=>{
    logLineAsync(logFN,"web server running on port "+port);
});
