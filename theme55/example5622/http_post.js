const http = require('http');

let sendData = new URLSearchParams(); // класс, позволяющий работать со строками в формате x-www-form-urlencoded в любых направлениях
sendData.append('f', 'READ');
sendData.append('n', 'LOKTEV_TEST_INFO');
// или так:
// const sendData="f=READ&n=LOKTEV_TEST_INFO";

const options = {
    hostname: 'fe.it-academy.by',
    port: 80,
    path: '/AjaxStringStorage2.php',
    method: 'POST',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded", 
        // сервис ожидает данные именно в этом формате, потому и используем URLSearchParams а не скажем JSON.stringify
    },
};

let result='';

const req = http.request(options, (res) => {

    console.log(`finished. StatusCode: ${res.statusCode}`);

    res.on('data', chunk => { // всегда ожидаем что данные приходят кусочками, даже если точно знаем что данных совсем немного!
        result+=chunk; // chunk - это Buffer, но при склейке со строкой он автоматом преобразуется к строке
    });

    res.on('end', () => { // всё загружено
        console.log('loaded:',JSON.parse(result));
    })

});

req.on('error', (err) => {
    throw err;
})

req.write(sendData.toString()); // посылаем тело запроса; toString() обязательно, т.к. write может принимать аргумент разного типа

req.end();
