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

    //const logFd = fs.open(logFilePath, 'a+');
    //fs.writeSync(logFd, fullLogLine + os.EOL);
    //fs.closeSync(logFd);


    let taskQueue=new TaskQueue(); // очередь задач по открытию файла и сохранению чанков
    let downloadFinished=false;
    let fd=null; // дескриптор файла

    function openFileTask() {
        return new Promise( (resolve,reject) => {
            fs.open(resultFile, 'a', (err,_fd) => { 
                if (err) 
                    reject(err);
                else {    
                    fd=_fd;
                    console.log('file has been opened for append, file descriptor = '+fd);
                    resolve();
                }
            });
        } );  
    }
    taskQueue.addTask(openFileTask);

    res.on('data', chunk => {
        console.log(chunk.length+' downloaded...');
      
        function appendChunkTask() {
            return new Promise( (resolve,reject) => {
                fs.write(fd, chunk, (err) => { // дописываем чанк в файл
                    if (err) 
                        reject(err);
                    else {    
                        resolve();
                    }
                });          
            } );  
        }
        taskQueue.addTask(appendChunkTask);

    });

    res.on('end', () => {
        console.log('all chunks have been downloaded.');
        downloadFinished=true;
    })

    taskQueue.on('done', () => {
        // done может возникать несколько раз, очередь опустошается быстро если диск быстрый а сеть медленная
        // поэтому проверяем downloadFinished
        if ( downloadFinished ) {
            fs.close(fd, err => {
                if ( err )
                    console.error(err);
                else {
                    fd=null;
                    console.log('file has been written completely.');
                }
            });
        }
    });
    
});

req.on('error', (err) => {
    throw err;
})

req.end();
