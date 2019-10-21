const { func_a2 } = require("./a2");
// во время работы этого require исполнится код в a2.js
// он попытается проимпортировать func_a1 из a1.js
// а a1.js ЕЩЁ НЕ проэкспортировал func_a1

func_a2();

function func_a1() {
    console.log("func_a1");
}

module.exports={
    func_a1
};
