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

    let chunks=[]; // это массив чанков, т.е. буферов

    res.on('data', chunk => {
      
      chunks.push(chunk);

    });

    res.on('end', () => {
        console.log('all chunks have been downloaded.');

        // Buffer.concat делает новый буфер из массива буферов, это быстро
        // flag:'w' создаёт файл если его не было и перезаписыает если он был, поэтому удаление файла перед загрузкой вообще не потребовалось
        fs.writeFile(resultFile, Buffer.concat(chunks), {flag:'w'}, (err)=>{
            if ( err )
                console.error(err);
            else
                console.log("file has been wrote");
        });
        
    });
    
});

req.on('error', (err) => {
    throw err;
})

req.end();
