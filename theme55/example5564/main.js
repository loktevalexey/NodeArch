console.log("main 1");

for ( var i=0; i<3; i++ ) {
    const { f } = require("./utils");
    console.log( f() );
}

console.log("main 2");
