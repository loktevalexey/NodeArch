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

const menu=[
    {text:"главная",ref:"/main.html"},
    {text:"футбол",ref:"/football.html"},
    {text:"биатлон",ref:"/biathlon.html"},
];

function getMenu(currentUrl) {
    return menu.map( item => ({
        ...item,
        isCurrentPage:item.ref===currentUrl
    }) );
}

webserver.get('/main.html', function (req, res) {
    logLineAsync(logFN,`[${port}] `+"dynamic page "+req.url);
    res.render('main_article',{
        layout:'article_layout',
        hello:"участникам соревнований",
        menu:getMenu(req.url),
    });
});
webserver.get('/football.html', function (req, res) {
    logLineAsync(logFN,`[${port}] `+"dynamic page "+req.url);
    res.render('football_article',{
        layout:'article_layout',
        hello:"футболистам",
        menu:getMenu(req.url),
    });
});
webserver.get('/biathlon.html', function (req, res) {
    logLineAsync(logFN,`[${port}] `+"dynamic page "+req.url);
    res.render('biathlon_article',{
        layout:'article_layout',
        hello:"биатлонистам",
        menu:getMenu(req.url),
    });
});

webserver.use(
    express.static(path.resolve(__dirname,"static"))
);

webserver.listen(port,()=>{
    logLineAsync(logFN,"web server running on port "+port);
});
