var mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/learning',{useNewUrlParser:true,useUnifiedTopology:true}); // последняя часть УРЛа - имя базы, она создастся сама если её пока нет
var db=mongoose.connection;
db.on('error',()=>{console.error('connection error:');});
db.once('open', function() {
    console.log("connected!");

    // схема - это описание структуры документов коллекции
    var studentSchema = new mongoose.Schema({
        name: String,
        height: Number,
    });
    /*
        в схеме можно использовать типы:
        String
        Number
        Date
        Buffer
        Вооlеап
        Mixed
        ObjectId (это поле, хранящее _id, т.е. ссылку на другой документ)
        Array
    */

    // модель - это класс, который позволяет работать с коллекцией в стиле ООП
    var Student = mongoose.model('Student', studentSchema);

    var ivanov = new Student({ name: 'Иванов', height: 180 });

    var petrov = new Student({ name: 'Петров', height: 170 });

    // сохраняем студентов
    ivanov.save(function (err) {
        if (err) return console.error(err);
        console.log("saved 1");

        petrov.save(function (err) {
            if (err) return console.error(err);
            console.log("saved 2");

            // получаем список всех студентов
            Student.find(function (err, students) {
              if (err) return console.error(err);
              console.log("студенты, которые есть в коллекции:");
              console.log(students);

              db.close();
            });

        });
  
    });

});
