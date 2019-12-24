const http = require('http');
const fs = require('fs');
const path = require('path');

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

    res.on('data', chunk => {
      
      fs.appendFileSync(resultFile, chunk);
      console.log(chunk.length+' written...');

    });

    res.on('end', () => {
        console.log('all chunks have been downloaded.');
    })
    
});

req.on('error', (err) => {
    throw err;
})

req.end();
