const path = require('path');
const fs = require('fs');

var readStream=fs.createReadStream( path.join(__dirname,"data.txt") );
var writeStream=fs.createWriteStream( path.join(__dirname,"data_copy.txt") );

readStream.on('data', chunk => {
    console.log('chunk length='+chunk.length);
    writeStream.write(chunk);
});
readStream.on('end',()=>{
    writeStream.end();
});
readStream.on('error', err =>{
    console.log("ERROR!",err);
});
