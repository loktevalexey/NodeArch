const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'GREETER> '
});

rl.prompt(); // выдать prompt и ждать ответа
rl.on('line', name => {

    if ( !name )  
        rl.close(); // если введена пустая строка - прерываем цикл REPL, и сработает событие close
    else {  
        console.log(`Привет, ${name}`);
        rl.prompt();  // снова выдать prompt и ждать ответа
    }

});

rl.on('close', () => {
    // сюда придём либо по Ctrl+C, либо по вводу пустой строки в ответ на prompt
    console.log('До свидания!');
    process.exit(0); // выход с признаком успешного завершения
});
