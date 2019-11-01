const express = require('express');
const path = require('path');

const { logLineAsync } = require('../../utils/utils');

const webserver = express();

const port = 7030;
const logFN = path.join(__dirname, '_server.log');

// по всем УРЛам, по которым найден существующий файл - он отдаётся
webserver.use(
    express.static( path.join(__dirname,"static") )
);

// по всем остальным УРЛам отдаём всегда index.html
// в этом суть роутинга SPA - по любому УРЛу отдаётся единственная существующая html-страница, а уж она анализирует УРЛ и строит что нужно
webserver.get('*', function(req, res){
    res.sendFile( path.join(__dirname,"static","index.html") );
});
  
webserver.listen(port);
logLineAsync(logFN,"web server running on port "+port);
