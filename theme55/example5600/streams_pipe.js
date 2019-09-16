const path = require('path');
const fs = require('fs');

var readStream=fs.createReadStream( path.join(__dirname,"data.txt") );
var writeStream=fs.createWriteStream( path.join(__dirname,"data_copy.txt") );

readStream.pipe(writeStream);
