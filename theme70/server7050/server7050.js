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

// когда из браузера загружаются js- и css-бандлы, они отдаются напрямую из папки build как обычная статика
webserver.use(
    express.static(path.resolve(__dirname, 'build'), { maxAge: '30d' })
);

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
}

// если обращение идёт к любому другому УРЛу - запускаем SSR
webserver.use('*', serverRenderer);

webserver.listen(port, () => {
    logLineAsync(logFN,"SSR running on port "+port);
});
