var mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/learning',{useNewUrlParser:true,useUnifiedTopology:true})
    .then( async db => {

        var studentSchema = new mongoose.Schema({
            name: String,
            height: Number,
        });

        var Student = mongoose.model('Student', studentSchema);

        var ivanov = new Student({ name: 'Иванов', height: 180 });

        var petrov = new Student({ name: 'Петров', height: 170 });

        await ivanov.save();
        await petrov.save();

        var students=await Student.find();
        console.log("\nстуденты, которые есть в коллекции:");
        console.log(students);

        var students=await Student.find( { name: /^И/ } );
        console.log("\nстуденты, имя которых начинается с 'и':");
        console.log(students);

        await Student.deleteOne({ name: 'Иванов' });
        console.log("\nИванов удалён");

        var students=await Student.find();
        console.log("\nстуденты, которые есть в коллекции:");
        console.log(students);

        mongoose.connection.close();
    } )
    .catch( error => {
        console.error('connection error:',error);
    } )
;