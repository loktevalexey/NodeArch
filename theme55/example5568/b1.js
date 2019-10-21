function func_b1() {
    console.log("func_b1");
}

module.exports={
    func_b1
};

const { func_b2 } = require("./b2");
// во время работы этого require исполнится код в b2.js
// он попытается проимпортировать func_b1 из b1.js
// а b1.js УЖЕ проэкспортировал func_b1

func_b2();
