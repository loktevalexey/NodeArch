const util = require('util');

function longMultiply(a,b,callback) {
    setTimeout( ()=>{
        callback(null,a*b); // типичное поведение асинхронной функции - НЕ возвращаем результат, а передаём его в коллбек
    } ,1000);
}

const longMultiplyPr = util.promisify(longMultiply);

async function f() {
    console.log("start");
    let res=await longMultiplyPr(5,7); // промисифицированная функция не вызывает коллбек с результатом, а возвращает промис с результатом
    console.log("получен результат: "+res);
}
f();
