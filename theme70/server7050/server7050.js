import path from 'path';
import fs from 'fs';
import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

const { logLineAsync } = require('../../utils/utils');

const webserver = express();

const port = 7050;
const logFN = path.join(__dirname, '_server.log');

import CoreApp from './src/CoreApp';

const serverRenderer = (req, res) => {
    fs.readFile(path.resolve(__dirname, 'src','index.html'), 'utf8', (err, indexStr) => {
        if (err) {
            console.error(err)
            return res.status(500).send('An error occurred');
        }

        // получаем HTML-код, соответствующий запрошенному УРЛу (он ведь разный для каждого УРЛа)
        let renderedHTML=ReactDOMServer.renderToString(
            <StaticRouter location={req.originalUrl} context={{}}>
                <CoreApp />
            </StaticRouter>
        );
        //console.log("renderedHTML",renderedHTML);
        logLineAsync(logFN,`[${port}] server-side rendered HTML ready, url=${req.originalUrl}, HTML length=${renderedHTML.length}`);

        // отдаём клиенту index.html с подставленным в container HTML-кодом
        // тем самым кодом, который React должен строить динамически внутри container
        return res.send(
            indexStr.replace(
                '<div id="container"></div>',
                `<div id="container">${renderedHTML}</div>`
            )
        );
    });
};

/*
webserver.use(function (req, res, next) {
    logLineAsync(logFN,`[${port}] `+"server called, originalUrl="+req.originalUrl);
    next();
});
*/

// если обращение идёт УРЛу / - запускаем SSR
webserver.use('/', serverRenderer);
// на самом деле, serverRenderer готов обработать любой УРЛ, но мы ПЕРЕД ним должны через middleware static отдать бандлы из папки build
// а там есть файл index.html
// а при обращении к УРЛу "/" middleware static отдаёт этот index.html, считая его совпадающим с этим УРЛ
// поэтому ещё до middleware static отдельно указываем что именно этот УРЛ обрабатывается serverRenderer

// когда из браузера загружаются js- и css-бандлы, они отдаются напрямую из папки build как обычная статика
webserver.use(
    express.static(path.resolve(__dirname, 'build'), { maxAge: '30d' })
);

// если обращение идёт к любому другому УРЛу - запускаем SSR
webserver.use('*', serverRenderer);

webserver.listen(port, () => {
    logLineAsync(logFN,"SSR running on port "+port);
});
