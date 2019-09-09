console.log(Date.now(),'start');

// ... сейчас идёт некий тик ...

// функция, указанная при создании промиса (которая и должна вызвать resolve или reject), вызывается СРАЗУ, синхронно
new Promise( (resolve,reject) => { console.log(Date.now(),'promise started'); } );

// nextTick выполнится в конце ЭТОГО тика
process.nextTick(()=>{ console.log(Date.now(),'nextTick'); });

// если промис зарезолвлен в этом тике, then сработает в начале СЛЕДУЮЩЕГО тика
Promise.resolve().then(()=>{ console.log(Date.now(),'promise resolved'); });

// setTimeout, setImmediate выполняется в начале СЛЕДУЮЩЕГО тика
setTimeout(()=>{ console.log(Date.now(),'setTimeout'); },0);
setImmediate(()=>{ console.log(Date.now(),'setImmediate'); });

console.log(Date.now(),'start2');
