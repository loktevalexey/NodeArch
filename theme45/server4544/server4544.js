const express = require('express');
const exphbs  = require('express-handlebars');
const path = require('path');

const { logLineAsync } = require('../../utils/utils');

const webserver = express();

webserver.engine('handlebars', exphbs());
webserver.set('view engine', 'handlebars');
webserver.set('views', path.join(__dirname, 'views'));

const port = 4544;
const logFN = path.join(__dirname, '_server.log');

webserver.get('/main.html', function (req, res) {
    res.render('main_page',{
        layout:'sport_layout',
        hello:"участникам соревнований",
    });
});
webserver.get('/football.html', function (req, res) {
    res.render('football_page',{
        layout:'sport_layout',
        hello:"футболистам",
    });
});
webserver.get('/biathlon.html', function (req, res) {
    res.render('biathlon_page',{
        layout:'sport_layout',
        hello:"биатлонистам",
    });
});

webserver.use(
    express.static(path.resolve(__dirname,"../site_sport_hb"))
);

webserver.listen(port);
logLineAsync(logFN,"web server running on port "+port);
