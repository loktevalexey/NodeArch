let ab=Buffer.alloc(2); // создаём Buffer длиной 2 байта
let ta16=new Uint16Array(ab.buffer); // в Buffer в свойстве buffer как раз и лежит тот самый ArrayBuffer
ta16[0]=511; // у этого числа в старшем байте 1, а в младшем - 255
// endianness у типизированных массивов всегда нативный для той платформы где выполняется код
// т.е. если у нас big endian - то в нулевом байте Buffer сейчас 255, а в первом - 1 (т.е. старший байт в конце, поэтому big endian).
// а если у нас little endian - всё наоборот
console.log("нулевой="+ab[0]+" первый="+ab[1]);
// представление в виде байтов накладывать не надо - Buffer включает в себя это представление
if ( ab[1]===1 ) 
    console.log("big endian detected!");
else
    console.log("little endian detected!");
