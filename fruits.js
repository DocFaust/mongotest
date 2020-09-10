const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/fruitsDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "What???"],
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
  },
  review: String,
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const apple = new Fruit({
  name: "apple",
  rating: 3,
  review: "Great",
});

apple.save();

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: Number,
  favouriteFruit: fruitSchema,
});

const Person = mongoose.model("Person", personSchema);

// const pineapple = new Fruit({
//   name: "Pineapple",
//   rating: 9,
//   review: "Great fruit",
// });

// pineapple.save();

// const personAmy = new Person({
//   name: "Amy",
//   age: 12,
//   favouriteFruit: pineapple,
// });
// personAmy.save();

const dragonfruit = new Fruit({
  name: "Dragonfruit",
  rating: 3,
  review: "Meh",
});

dragonfruit.save();

// const personJohn = new Person({
//   name: "John",
//   age: 37
// //  favouriteFruit: dragonfruit,
// });

// personJohn.save();

Person.updateOne({ name: "John" }, { favouriteFruit: dragonfruit }, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Success!");
  }
});

const peach = new Fruit({
  name: "Peach",
  rating: 10,
  review: "Great",
});

//peach.save();

const banana = new Fruit({
  name: "Banana",
  rating: 3,
  review: "Weird texture",
});

const kiwi = new Fruit({
  name: "Kiwi",
  rating: 10,
  review: "Best fruit",
});
const orange = new Fruit({
  name: "Orange",
  rating: 4,
  review: "Too sour",
});

Fruit.insertMany([kiwi, orange, banana], (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Success!");
  }
});

Fruit.find((err, fruits) => {
  if (err) {
    console.log(err);
  } else {
    mongoose.connection.close();
    fruits.forEach((fruit) => console.log(fruit.name + ": " + fruit.rating));
  }
});

// Fruit.updateOne({_id: "5f30dde23d002c7ec0a19930"}, {name: "Peach"}, err => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Success!");
//   }
// });

Fruit.deleteMany({ name: "Banana" }, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Success!");
  }
});

// Person.deleteMany({ name: "John" }, (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Success!");
//   }
// });

