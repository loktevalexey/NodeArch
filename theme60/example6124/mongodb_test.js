const MongoClient = require('mongodb').MongoClient;
 
const serverURL = 'mongodb://localhost:27017'; // УРЛ сервера Mongo
 
const databaseName = 'learning'; // имя базы данных
 
MongoClient.connect(serverURL, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, client) {
    if ( err )
      console.error(err);
    else {
        console.log("Connected successfully to server");
    
        const database = client.db(databaseName); // получаем ссылку на базу данных

        const studentsCollection = database.collection('Student'); // получаем ссылку на коллекцию
        
        // вставляем новые документы
        studentsCollection.insertMany([ {name:'Сидоров', height:185}, {name:'Григорьев', height:192} ], function(err, result) {
            if ( err )
                console.error(err);
            else {
                console.log("insert done", result);

                // получаем полный список студентов, {} - пустое условие фильтрации
                studentsCollection.find({}).toArray(function(err, docs) {
                    if ( err )
                        console.error(err);
                    else {
                        console.log("students found:");
                        console.log(docs);

                        client.close(); // закрываем соединение с БД
                    }
                  });

            }
        });

        
    }
    
});
