function longMultiply(a,b,callback) {
    setTimeout( ()=>{
        callback(null,a*b); // типичное поведение асинхронной функции - НЕ возвращаем результат, а передаём его в коллбек
    } ,1000);
}

console.log("start");
longMultiply(5,7,(err,res)=>{
    console.log("получен результат: "+res);
});
