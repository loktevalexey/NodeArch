import path from 'path';
import fs from 'fs';
import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

const { logLineAsync } = require('../../utils/utils');

const webserver = express();
const router = express.Router();

const port = 7050;
const logFN = path.join(__dirname, '_server.log');

import AllApp from './src/AllApp';

const serverRenderer = (req, res, next) => {
    fs.readFile(path.resolve(__dirname, 'src','index.html'), 'utf8', (err, data) => {
        if (err) {
            console.error(err)
            return res.status(500).send('An error occurred');
        }
        let renderedHTML=ReactDOMServer.renderToString(<StaticRouter location="/" context={{}}><AllApp /></StaticRouter>);
        console.log("renderedHTML",renderedHTML);
        return res.send(
            data.replace(
                '<div id="container"></div>',
                `<div id="container">${renderedHTML}</div>`
                //'<div id="root">aaa</div>',
            )
        );
    });
}

router.use('^/$', serverRenderer);

router.use(
    express.static(path.resolve(__dirname, '..', 'build'), { maxAge: '30d' })
);

webserver.use(router);

webserver.listen(port, () => {
    logLineAsync(logFN,"SSR running on port "+port);
});
