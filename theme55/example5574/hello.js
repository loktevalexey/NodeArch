const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question(`Ваша фамилия? `, fam => {
    
    rl.question(`Ваш возраст? `, age => {

        console.log(`Привет, ${fam}, тебе ${age} лет!`);

        rl.close();
    });
        
});

