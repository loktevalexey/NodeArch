const express = require('express');
const path = require('path');
const fsp = require('fs').promises;

const { logLineAsync } = require('../../utils/utils');

const webserver = express();

const port = 7621;
const logFN = path.join(__dirname, '_server.log');

webserver.get('/slowpage', async function (req, res) {
    logLineAsync(logFN,`[${port}] запрос медленной страницы`);
    
    // специально задерживаем ответ на 3 сек
    await new Promise( (resolve,reject) => { setTimeout(resolve,3000) } );

    res.send(`<h3>содержимое страницы медленно, но сформировано!</h3>`);
});

webserver.listen(port,()=>{
    logLineAsync(logFN,"web server running on port "+port);
});
