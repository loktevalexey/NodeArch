const http = require('http');
const fs = require('fs');
const path = require('path');

const resultFile = path.join(__dirname,'download.gif');

// будем загружать http://fe.it-academy.by/Examples/Animated-Flag-Altai-Krai.gif

fs.unlink(resultFile, (err) => {
    if ( err ) {
        if ( err.code!=="ENOENT" ) // если ошибка "а файла и не было" - игнорируем ошибку
            throw err;
    }
});

// проблема №1 - мы делаем http-запрос, не дождавшись пока удалится файл

const options = {
    hostname: 'fe.it-academy.by',
    port: 80,
    path: '/Examples/Animated-Flag-Altai-Krai.gif',
    method: 'GET'
};

const req = http.request(options, (res) => {

    console.log(`statusCode: ${res.statusCode}`);

    res.on('data', chunk => {
      
      // проблема №2 - мы вызываем appendFile, не дождавшись пока предыдущий appendFile закончится

      fs.appendFile(resultFile, chunk, (err) => { // каждый загружаемый кусочек данных дописываем к файлу download.gif
          if (err) throw err;
          console.log(chunk.length+' written...');
      });

    });

    res.on('end', () => {
        console.log('all chunks have been downloaded.');
    })
    
});

req.on('error', (err) => {
    throw err;
})

req.end();
