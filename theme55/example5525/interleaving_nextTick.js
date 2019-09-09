setInterval(()=>{ console.log("сделан кусок ПЕРВОЙ работы...") },1000);

function work2() {
    let sum=0;
    for ( var a=0; a<10000; a++ )
        for ( var b=0; b<10000; b++ )
            sum+=a+b;
    console.log("сделан кусок второй работы...")
    process.nextTick(work2);
}
process.nextTick(work2);