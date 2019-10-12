require("../theme30/server3050/server3050");
require("../theme30/server3060/server3060");
require("../theme30/server3070/server3070");
require("../theme30/server3082/server3082");

require("../theme35/server3533/server3533");
require("../theme35/server3535/server3535");
require("../theme35/server3538/server3538");
require("../theme35/server3540/server3540");
require("../theme35/server3545/server3545");
require("../theme35/server3550/server3550");
require("../theme35/server3560/server3560");
require("../theme35/server3570/server3570");
require("../theme35/server3585/server3585");

require("../theme40/server4022/server4022");
require("../theme40/server4025/server4025");
require("../theme40/server4028/server4028");
require("../theme40/server4032/server4032");
require("../theme40/server4033/server4033");
require("../theme40/server4035/server4035");
require("../theme40/server4037/server4037");
require("../theme40/server4040/server4040");
require("../theme40/server4050/server4050");
require("../theme40/server4060/server4060");
require("../theme40/server4070/server4070");
require("../theme40/server4082/server4082");
require("../theme40/server4083/server4083");

require("../theme45/server4530/server4530");
require("../theme45/server4542/server4542");
require("../theme45/server4544/server4544");
require("../theme45/server4560/server4560");

require("../theme55/server5632/server5632");
require("../theme55/server5633/server5633");

require("../theme60/server6082/server6082");
require("../theme60/server6086/server6086");

require('ignore-styles'); // игнорировать CSS-файлы, если где-то будут импортироваться
require('@babel/register')({ 
  ignore: [ /(node_modules)/ ], // не транспилировать всё что в node_modules (как правило там всё уже оттранспилированное)
  only: [ /server4570/ ], // в этом примере используются ES6-модули
  presets: [ ['@babel/preset-env', { "targets": { "node": "10.12" } } ] ] 
});
require('../theme45/server4570/server4570'); // этот require бабель перекрыл (благодаря @babel/register) и уже транспилирует код перед тем как Node.js его выполнит
