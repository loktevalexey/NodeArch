const EventEmitter = require('events');

class MyTimer extends EventEmitter {

    constructor(interval) {
        super();

        let count=0;
        setInterval(()=>{
            count++;
            this.emit('timer',count);
        },interval);

    }

}

const myTimer = new MyTimer(1000);
myTimer.on('timer', count => {
    console.log("таймер сработал: "+count);
} );