const path = require('path');
const fs = require('fs');

var stats="";

var readStream=fs.createReadStream( path.join(__dirname,"data.txt") );
readStream.on('data', chunk => {
    stats+=chunk;
    console.log("read "+chunk.length+" bytes");
});
readStream.on('end',()=>{
    console.log("all read - "+stats.length+" bytes");
});
readStream.on('error', err =>{
    console.log("ERROR!",err);
});
