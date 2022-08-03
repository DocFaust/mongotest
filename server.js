//jshint esversion:8
const dotenv = require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;
const app = express(); 

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const mongourl = process.env.mongourl;

console.log(mongourl);

mongoose.connect(mongourl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const playerSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  activityLevel: Number,
});

const entrySchema = new mongoose.Schema({
  date: Date,
  description: String,
  player: playerSchema,
  amount: mongoose.Schema.Types.Decimal128,
});

const seasonSchema = new mongoose.Schema({
  name: String,
  startDate: Date,
  endDate: Date,
  price: mongoose.Schema.Types.Decimal128,
});

const gameSchema = new mongoose.Schema({
  date: Date,
  season: seasonSchema,
  entries: [entrySchema],
});


const Game = mongoose.model("Game", gameSchema);
const Player = mongoose.model("Player", playerSchema);
const Entry = mongoose.model("Entry", entrySchema);
const Season = mongoose.model("Season", seasonSchema);

app.route("/").get(async (req, res) => {
  const playersList = await Player.find();
  console.log(playersList);
  res.render("index", {"playersList": playersList});
});

app.route("/season").get(async (req, res) => {
  const seasonsList = await Season.find();

  res.render("season", {seasonsList: seasonsList});
}).post(async (req,res)=>{
  const name = req.body.name;
  const startdate = req.body.startDate;
  const enddate = req.body.endDate;
  const price = req.body.price;

  const season = new Season({
    name: name,
    startDate: startdate,
    endDate: enddate,
    price: price
  });

  await season.save().then(res.redirect("/season")); 

});

app
  .route("/player")
  .get(async (req, res) => {
    const playersList = await Player.find();
    console.log(playersList);
    res.render("player", {"playersList": playersList});
  });


app
  .route("/createPlayer")
  .get(async (req, res) => {
    const playersList = await Player.find();
    console.log(playersList);
    res.render("createPlayer");
  })
  .post(async (req, res) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;

    const player = new Player({
      firstName: firstname,
      lastName: lastname,
      email: email,
      activityLevel: 0,
    });
    await player.save().then(res.redirect("/player"));
  });

  app.route("/creategame").get(async (req, res) => {
    const playersList = await Player.find();
    res.render("creategame", {playersList: playersList});
  }).post(async (req, res) => {
    console.log(res.body);
  })

  app.route("/test").get(async (req, res) => {
    const playersList = await Player.find();

    const entry1 = new Entry({
      date: Date.now(),
      description: "Spieleinsatz",
      player: playersList[0],
      amount: 10.10
    })

    await entry1.save();

    const entry2 = new Entry({
      date: Date.now(),
      description: "Spieleinsatz",
      player: playersList[1],
      amount: 10.10
    })

    await entry2.save();

    const entry3 = new Entry({
      date: Date.now(),
      description: "Spieleinsatz",
      player: playersList[2],
      amount: 10.10
    })

    await entry3.save();

    const game = new Game({
      date: Date.now(),
      players: playersList,
      entries: [entry1, entry2, entry3],
    })

    await game.save();
    res.send("Suppa");
  })



app.listen(port, () => {
  console.log("Listening to port " + port);
});
