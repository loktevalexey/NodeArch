function func_b2() {
    console.log("func_b2");
}

module.exports={
    func_b2
};

const { func_b1 } = require("./b1");

func_b1();
