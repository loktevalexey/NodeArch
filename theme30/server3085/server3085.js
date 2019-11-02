const express = require('express');
const fs = require('fs');
const path = require('path');
const os = require('os');

const webserver = express();

webserver.use(express.urlencoded({extended:true}));

const port = 3085;
const logFN = path.join(__dirname, '_server.log');

function logLineSync(logFilePath,logLine) {
    const logDT=new Date();
    let time=logDT.toLocaleDateString()+" "+logDT.toLocaleTimeString();
    let fullLogLine=time+" "+logLine;

    console.log(fullLogLine);

    const logFd = fs.openSync(logFilePath, 'a+');
    fs.writeSync(logFd, fullLogLine + os.EOL);
    fs.closeSync(logFd);
}

webserver.get('/service2', (req, res) => { 
    logLineSync(logFN,`[${port}] `+"service2 called, get pars: "+JSON.stringify(req.query));
    
    let par1=parseInt(req.query.par1)||0;
    let par2=escapeHTML(req.query.par2);

    if ( par1<=0 || par1>=10 ) {
        res.status(400);
        if ( process.env.NODE_ENV==="development" )
            res.send("par1 must be between 0 and 10");
        else
            res.end();
    }
    else {
        res.send("service2 ok, par1="+par1+" par2="+par2);
    }
});

webserver.listen(port);
logLineSync(logFN,"web server running on port "+port);
logLineSync(logFN,`[${port}] `+"environment variable NODE_ENV is "+process.env.NODE_ENV);
logLineSync(logFN,`[${port}] `+"environment variable VAR1 is "+process.env.VAR1);

function escapeHTML(text) {
    if ( !text )
        return text;
    text=text.toString()
        .split("&").join("&amp;")
        .split("<").join("&lt;")
        .split(">").join("&gt;")
        .split('"').join("&quot;")
        .split("'").join("&#039;");
    return text;
}
