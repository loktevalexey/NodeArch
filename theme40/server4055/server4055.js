const express = require('express');
const fs = require('fs');
const path = require('path');

const { logLineAsync } = require('../../utils/utils');

const webserver = express();

webserver.use(express.urlencoded({extended:true}));

const port = 4055;

const logFN = path.join(__dirname, '_server.log');
const usersFN = path.join(__dirname, 'users.json');

webserver.post('/register', (req, res) => { 
    logLineAsync(logFN,`[${port}] `+'регистрируем пользователя, login='+req.body.login+" age="+req.body.age);

    let usersJSON=fs.readFileSync(usersFN,"utf8");
    let users=JSON.parse(usersJSON);
    users.push({login:req.body.login,age:req.body.age});
    fs.writeFileSync(usersFN,JSON.stringify(users),"utf8");

    const resultTable=`
        <table>
        ${users.map( user => `<tr><td>${user.login}</td><td>${user.age}</td></tr>` ).join("")}
        </table>
    `;

    res.send("вы зарегистрированы, поздравляем!<br><br>"+resultTable);
});

webserver.listen(port,()=>{
    logLineAsync(logFN,"web server running on port "+port);
});
