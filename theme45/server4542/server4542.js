const express = require('express');
const exphbs  = require('express-handlebars');
const path = require('path');

const { logLineAsync } = require('../../utils/utils');

const webserver = express();

webserver.engine('handlebars', exphbs());
webserver.set('view engine', 'handlebars');
webserver.set('views', path.join(__dirname, 'views'));

const port = 4542;
const logFN = path.join(__dirname, '_server.log');

webserver.get('/main.html', function (req, res) {
    logLineAsync(logFN,"dynamic page "+req.url);
    res.render('main_page',{  // отрендерить view "main_page"
        layout:'sport_layout', // в layout-е "sport_layout"
        hello:"участникам соревнований", // в подстановках использовать вот такие данные
    });
});
webserver.get('/football.html', function (req, res) {
    logLineAsync(logFN,"dynamic page "+req.url);
    res.render('football_page',{
        layout:'sport_layout',
        hello:"футболистам",
    });
});
webserver.get('/biathlon.html', function (req, res) {
    logLineAsync(logFN,"dynamic page "+req.url);
    res.render('biathlon_page',{
        layout:'sport_layout',
        hello:"биатлонистам",
    });
});

webserver.use(
    express.static(path.resolve(__dirname,"static"))
);

webserver.listen(port);
logLineAsync(logFN,"web server running on port "+port);
