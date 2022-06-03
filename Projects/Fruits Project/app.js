const mongoose = require ("mongoose");

mongoose.connect ("mongodb://localhost:27017/fruitsDB");

const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [
        true,
        "Name is required"
    ]
  },
  color: String
})

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit ({
  name: "Pineapple",
  color: "Yellow and Green"
});

// fruit.save();

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favFruit: fruitSchema
});

const Person = mongoose.model("Person", personSchema);

// const person = new Person ({
//   name: "John",
//   age: 37
// });

// person.save();

// Fruit.find(function (err, fruits) {
//   if (err) {
//     console.log(err);
//   } else {
//     mongoose.connection.close();

//     fruits.forEach(function(fruit) {
//       console.log(fruit.name);
//     });
//   }
// });

Person.updateOne({name: "John"}, {favFruit: fruit}, function(err){
  if (err) {
    console.log(err);
  } else {
    console.log("Successfully updated favorite fruit.")
  }
});

Person.find(function (err, persons) {
  if (err) {
    console.log(err);
  } else {
    mongoose.connection.close();

    persons.forEach(function(person) {
      console.log(person);
    });
  }
});

// Person.deleteOne({name: "John"}, function(err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Successfully deleted");
//   }
// })

// Fruit.deleteMany({name: "Pineapple"}, function(err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Successfully deleted");
//   }
// })