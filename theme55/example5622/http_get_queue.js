const http = require('http');
const fs = require('fs');
const path = require('path');

const { TaskQueue } = require("./utils.js");

const resultFile = path.join(__dirname,'download.gif');

try {
    fs.unlinkSync(resultFile);
}
catch ( err ) {
    if ( err.code!=="ENOENT" ) {
        console.error(err);
        process.exit(-1);
    }
}
  
const options = {
    hostname: 'fe.it-academy.by',
    port: 80,
    path: '/Examples/Animated-Flag-Altai-Krai.gif',
    method: 'GET'
};

const req = http.request(options, (res) => {

    console.log(`statusCode: ${res.statusCode}`);

    let taskQueue=new TaskQueue(); // очередь задач по сохранению чанков
    let downloadFinished=false;

    res.on('data', chunk => {
      
        function task() {

            return new Promise( (resolve,reject) => {

                fs.appendFile(resultFile, chunk, (err) => { 
                    if (err) 
                        reject(err);
                    else {    
                        console.log(chunk.length+' downloaded...');
                        resolve();
                    }
                });
          
            } );  
        
        }

        taskQueue.addTask(task);

    });

    res.on('end', () => {
        console.log('all chunks downloaded.');
        downloadFinished=true;
    })

    taskQueue.on('done', () => {
        // done может возникать несколько раз, очередь опустошается быстро если диск быстрый а сеть медленная
        // поэтому проверяем downloadFinished
        if ( downloadFinished )
            console.log('file has been written completely.');
    });
    
});

req.on('error', (err) => {
    throw err;
})

req.end();
