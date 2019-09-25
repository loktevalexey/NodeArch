const os = require('os');

console.log("os.EOL",JSON.stringify(os.EOL)); // в Windows строки заканчиваются на \r\n, в Linux - на \n

console.log("os.cpus()",os.cpus()); // информация о процессорах системы
// возвращается массив хэшей вида { model: 'Intel(R) Core(TM) i7-8550U CPU @ 1.80GHz', speed: 1992, ... }

console.log("os.totalmem()",os.totalmem()); // общий объём оперативной памяти, байт
console.log("os.freemem()",os.freemem()); // свободно оперативной памяти, байт

console.log("os.homedir()",os.homedir()); // домашний каталог пользователя

console.log("os.loadavg()",os.loadavg()); // загрузка процессоров системы (точнее - средняя длина очереди задач к процессору)
// возвращается массив дробных чисел, соответствующих средней загрузке процессоров за последнюю минуту, 5 минут, 15 минут соответственно
// на Windows не работает!

console.log("os.platform()",os.platform()); // программная платформа, для которой был скомпилирован Node.js ("win32", "linux"...)
console.log("os.type()",os.type()); // операционная система, под которой запущен Node.js ("Linux", "Windows_NT"...)
console.log("os.release()",os.release()); // версия операционной системы, под которой запущен Node.js

console.log("os.tmpdir()",os.tmpdir()); // каталог, который можно использовать для хранения временных файлов
