function longMultiply(a,b,callback) {
    setTimeout( ()=>{
        callback(null,a*b); // типичное поведение асинхронной функции - НЕ возвращаем результат, а передаём его в коллбек
    } ,1000);
}

// универсальный промисификатор для Node.js-функций, работающих с коллбеками -
// трактует последний аргумент промисифицируемой функции как коллбек, получающий первым аргументом ошибку, а остальными - полезные данные
function promisificator(f) {
    return function(...args) {
        return new Promise( (resolve,reject)=>{
            f(...args,(err,...res)=>{
                if ( err ) 
                    reject(err);
                else    
                    resolve(...res);
            });
        } );
    };
}

const longMultiplyPr = promisificator(longMultiply);

async function f() {
    console.log("start");
    let res=await longMultiplyPr(5,7); // промисифицированная функция не вызывает коллбек с результатом, а возвращает промис с результатом
    console.log("получен результат: "+res);
}
f();
