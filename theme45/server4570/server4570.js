const express = require('express');
const path = require('path');

const { logLineAsync } = require('../../utils/utils');

import { getAnketaValidationErrors } from "./shared/anketavalidation";

const webserver = express();

const port = 4570;
const logFN = path.join(__dirname, '_server.log');

webserver.use(express.urlencoded({extended:true}));

webserver.post('/send', (req, res) => { 
    console.log('send called');

    var anketa={
        fam: req.body.fam,
        im: req.body.im,
        otch: req.body.otch,
        gender: req.body.gender,
    };

    const errors = getAnketaValidationErrors(anketa);

    if ( !errors.length )  {
        logLineAsync(logFN,"anketa ok");
        res.send("anketa ok!");
    }
    else {
        logLineAsync(logFN,"bad anketa");
        errors.forEach( error => {
            logLineAsync(logFN,"ошибка: "+error.errortext);
        } )
        res.status(400).send("bad anketa");
    }
});

webserver.use(
    "/shared/",
    express.static(path.resolve(__dirname,"shared"))
);

webserver.use(
    express.static(path.resolve(__dirname,"static"))
);

webserver.listen(port);
logLineAsync(logFN,"web server running on port "+port);
