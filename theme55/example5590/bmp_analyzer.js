const path = require('path');
const fsp = require('fs').promises; // используем экспериментальное API работы с файлами, основанное на промисах

(async function() {
    try {

        let bmpDataBuf=await fsp.readFile(path.resolve(__dirname,"data","girl.bmp"));
        // раз мы не указали кодировку данных (второй аргумент readFile), значит, получим Buffer
        console.log("загружены данные:",bmpDataBuf);

        // т.к. Buffer включает в себя функциональность и DataView тоже, мы можем сразу прочитать из указанной позиции 
        // нужные нам 4-байтовые целые, явно указывая их endianness

        let imageWidth=bmpDataBuf.readInt32LE(18); // с 18-го байта лежит ширина картинки в пикселях - она 4-байтовая (Int32) и она в little endian (LE) формате
        let imageHeight=bmpDataBuf.readInt32LE(22);
        console.log(`width=${imageWidth} height=${imageHeight}`);
    }
    catch ( err ) {
        console.error(err);
    }
})();
