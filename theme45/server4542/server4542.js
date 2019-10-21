const express = require('express');
const exphbs  = require('express-handlebars');
const path = require('path');
const fs = require('fs');
const handlebars = require('handlebars'); // это только для страницы тенниса - она формируется низкоуровневым способом

const { logLineAsync } = require('../../utils/utils');

const webserver = express();

webserver.engine('handlebars', exphbs()); // регистрируем движок шаблонов handlebars в списке движков шаблонов express
webserver.set('view engine', 'handlebars'); // устанавливаем, что будет использоваться именно движок шаблонов handlebars
webserver.set('views', path.join(__dirname, 'views')); // задаём папку, в которой будут шаблоны

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
webserver.get('/tennis.html', function (req, res) {
    logLineAsync(logFN,"dynamic page "+req.url);
    
    const viewString=fs.readFileSync(path.join(__dirname, 'views','tennis_page.handlebars'),"utf8"); // шаблон страницы тенниса
    const viewTemplate = handlebars.compile(viewString); // получаем функцию, умеющую сформироват итоговый html на основе параметров
    const viewHTML = viewTemplate({ // вызываем эту функцию, передавая уже конкретные параметры
        hello:"теннисистам",
    });

    const layoutString=fs.readFileSync(path.join(__dirname, 'views','layouts','sport_layout.handlebars'),"utf8"); // layout, общий для всех страниц

    res.send(layoutString.split("{{{body}}}").join(viewHTML)); // в layout же {{{body}}} для подстановки конкретной страницы, подставляем руками
});

webserver.use(
    express.static(path.resolve(__dirname,"static"))
);

webserver.listen(port);
logLineAsync(logFN,"web server running on port "+port);
