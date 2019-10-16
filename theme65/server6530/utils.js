const fs = require('fs');
const os = require('os');

// пишет строку в файл лога и одновременно в консоль
function logLine(logFilePath,logLine) {

    return new Promise( (resolve,reject) => {

        const logDT=new Date();
        let time=logDT.toLocaleDateString()+" "+logDT.toLocaleTimeString();
        let fullLogLine=time+" "+logLine;
    
        console.log(fullLogLine); // выводим сообщение в консоль
    
        fs.open(logFilePath, 'a+', (err,logFd) => {
            if ( err ) 
                reject(err);
            else    
                fs.write(logFd, fullLogLine + os.EOL, (err) => {
                    if ( err )
                        reject(err); 
                    else    
                        fs.close(logFd, (err) =>{
                            if ( err )
                                reject(err);
                            else    
                                resolve();
                        });
                });
    
        });
            
    } );

}

let dividerRES="[ \n\r]";
let tagNameRES="[a-zA-Z0-9]+";
let attrNameRES="[a-zA-Z]+";
let attrValueRES="(?:\".+?\"|'.+?'|[^ >]+)";
let attrRES="("+attrNameRES+")(?:"+dividerRES+"*="+dividerRES+"*("+attrValueRES+"))?";
let openingTagRES="<("+tagNameRES+")((?:"+dividerRES+"+"+attrRES+")*)"+dividerRES+"*/?>"; // включает и самозакрытый вариант
let closingTagRES="</("+tagNameRES+")"+dividerRES+"*>";

let openingTagRE=new RegExp(openingTagRES,"g");
let closingTagRE=new RegExp(closingTagRES,"g");

// удаляет из строки все теги
function removeTags(str,replaceStr="") {
    if ( typeof(str)=="string" && str.indexOf("<")!=-1 ) {
        str=str.replace(openingTagRE,replaceStr);
        str=str.replace(closingTagRE,replaceStr);
    }
    return str;
}

function reportServerError(error,res,logFN) {
    if ( res )
        res.status(500).end();
    if ( logFN )    
        logLine(logFN,error);
}

function reportRequestError(error,res,logFN) {
    if ( res )
        res.status(400).end();
    if ( logFN )    
        logLine(logFN,error);
}

module.exports={
    logLine,
    reportServerError,
    reportRequestError,
    removeTags,
};
