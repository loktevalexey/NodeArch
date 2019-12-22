const http = require('http');
const fs = require('fs');
const path = require('path');

const resultFile = path.join(__dirname,'download.gif');

const options = {
    hostname: 'fe.it-academy.by',
    port: 80,
    path: '/Examples/Animated-Flag-Altai-Krai.gif',
    method: 'GET'
};

const req = http.request(options, (res) => {

    console.log(`statusCode: ${res.statusCode}`);

    var writeStream=fs.createWriteStream( resultFile );
    // если файл уже есть, createWriteStream по умолчанию его перезаписывает (flags:'w'), поэтому удалять файл в начале и не пришлось

    res.pipe(writeStream);
    
    writeStream.on('close', ()=>{
        console.log("file has downloaded and writed");
    });

});

req.on('error', (err) => {
    throw err;
})

req.end();
