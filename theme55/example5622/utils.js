const EventEmitter = require('events');

// класс хранит очередь задач (функция, возвращающая промис)
// и вызывает очередную задачу, когда предыдущая закончилась (промис зарезолвился)

class TaskQueue extends EventEmitter {

    constructor() {
        super();
        this.queue=[];
        this.taskRunning=false;
    }

    addTask(task) {
        this.queue.push(task);
        this.runNextTask();
    }

    runNextTask() {
        if ( !this.taskRunning) {
            if ( this.queue.length ) {
                let task=this.queue.shift();
                let taskPromise=task();
                this.taskRunning=true;
                taskPromise.then( ()=>{
                    this.taskRunning=false;
                    this.runNextTask();
                } );
            }
            else
                this.emit('done'); // выпускаем событие done когда очередь пуста
        }

    }

}

module.exports={
    TaskQueue,
}