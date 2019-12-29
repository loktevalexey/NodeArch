const fs = require('fs');
const os = require('os');
const path = require('path');

// пишет строку в файл лога и одновременно в консоль

// синхронная версия
function logLineSync(logFilePath,logLine) {
    const logDT=new Date();
    let time=logDT.toLocaleDateString()+" "+logDT.toLocaleTimeString();
    let fullLogLine=time+" "+logLine;

    console.log(fullLogLine); // выводим сообщение в консоль

    const logFd = fs.openSync(logFilePath, 'a+'); // и это же сообщение добавляем в лог-файл
    fs.writeSync(logFd, fullLogLine + os.EOL); // os.EOL - это символ конца строки, он разный для разных ОС
    fs.closeSync(logFd);
}

// асинхронная версия
function logLineAsync(logFilePath,logLine) {

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

// дописывает заданный постфикс к имени (не расширению) файла
function getTempFileName(targetPFN,postfix="_tmp") {
    const targetPathParts=path.parse(targetPFN);
    return targetPathParts.dir+path.sep+targetPathParts.name+postfix+targetPathParts.ext;
}

// генерирует случайное имя файла (по-хорошему можно ещё проверить, а может такой уже существует, и перегенерить в этом случае)
function getRandomFileName(targetPath) {
  return path.resolve(targetPath,Math.random().toString(36).substring(2, 15));
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

module.exports={
    logLineSync,
    logLineAsync,
    getTempFileName,
    getRandomFileName,
    removeTags,
};
