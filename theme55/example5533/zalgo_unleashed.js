let cachedResult=null;
function loadData(callback) {

    if ( !cachedResult ) {
        setTimeout(()=>{ // таймером имитируем долгую загрузку данных по сети
            const result=25;
            console.log("loadData загрузила данные - "+result);
            cachedResult=result; // запоминаем результат, полученный с такими сложностями
            callback(result); // коллбек вызывается асинхронно
        },500); 
    }
    else {
        // данные уже были получены
        console.log("loadData имеет закэшированные данные - "+cachedResult);
        callback(cachedResult); // коллбек вызывается синхронно
    }
}

function Broadcaster() {

    this.listeners = [];

    this.broadcast = value => {
        this.listeners.forEach( func => func(value) );
    }

    this.addListener = func => {
        this.listeners.push(func);
    }

    loadData(this.broadcast);
}

console.log("создаём первый оповещатель");
broadcaster1=new Broadcaster;
broadcaster1.addListener( value => { console.log("слушатель №1: "+value); } );
broadcaster1.addListener( value => { console.log("слушатель №2: "+value); } );

setTimeout(()=>{

    console.log("создаём второй оповещатель");
    broadcaster2=new Broadcaster;
    broadcaster2.addListener( value => { console.log("слушатель №3: "+value); } );
    broadcaster2.addListener( value => { console.log("слушатель №4: "+value); } );
        
},1000);