
// запуск: node example2560 arg1 arg2
// arg1==="a" - ничего не делать
// arg1==="b" - сразу выход
// arg1==="c" - запустить таймер на arg2 миллисекунд

console.log("argv[0]: ",process.argv[0]);
console.log("argv[1]: ",process.argv[1]);
console.log("argv[2]: ",process.argv[2]);
console.log("argv[3]: ",process.argv[3]);

let arg1=process.argv[2];
let arg2=parseInt(process.argv[3]);

switch ( arg1 ) {
    case "a":
        console.log("arg1=a - nothing to do");
        break;
    case "b":
        console.log("arg1=b - terminating immediately");
        process.exit();
        // break; - можно не писать - выполнение сюда не дойдёт
    case "c":
        console.log("arg1=c - waiting "+arg2+" milliseconds");
        setTimeout(()=>{
            console.log("waiting finished.");
        },arg2);
        break;
}

console.log("finish.");
