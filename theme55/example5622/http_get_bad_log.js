const http = require('http');
const fs = require('fs');
const path = require('path');

const resultFile = path.join(__dirname,'download.gif');

fs.unlink(resultFile, (err) => {
    if ( err ) {
        if ( err.code!=="ENOENT" ) // если ошибка "а файла и не было" - игнорируем ошибку
            throw err;
    }
});

const options = {
    hostname: 'fe.it-academy.by',
    port: 80,
    path: '/Examples/Animated-Flag-Altai-Krai.gif',
    method: 'GET'
};

const req = http.request(options, (res) => {

    console.log(`statusCode: ${res.statusCode}`);

    let chunkNum=0;

    res.on('data', chunk => {
      
      let cn=++chunkNum;
      console.log(`chunk #${cn} - data event`); 

      fs.appendFile(resultFile, chunk, (err) => { // каждый загружаемый кусочек данных дописываем к файлу download.gif
          if (err) throw err;
          console.log(`chunk #${cn} - appendFile finished`); 
      });

    });

    res.on('end', () => {
        console.log('all chunks downloaded.');
    })
    
});

req.on('error', (err) => {
    throw err;
})

req.end();
