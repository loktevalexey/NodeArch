const fs = require('fs');

let results=[];

function checkFile(filename) {
    try {
        let txt=fs.readFileSync(filename,"utf8");
        try {
            let files=JSON.parse(txt);
            files.forEach( file => checkFile(file) );
        }
        catch ( er ) {
            results.push(txt);
        }
    }
    catch ( er ) {
        console.log(filename+" skipped");
    }
    
}

checkFile("root.txt");
console.log(results.join(" "));
