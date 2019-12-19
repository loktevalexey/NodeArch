const path = require('path');
const fs = require('fs');

var stats="";

var readStream=fs.createReadStream( path.join(__dirname,"data.txt"), "utf8" );
readStream.on('data', chunk => {
    stats+=chunk;
    console.log("read "+chunk.length+" chars");
});
readStream.on('end',()=>{
    console.log("all read - "+stats.length+" chars");
});
readStream.on('error', err =>{
    console.log("ERROR!",err);
});
