//jshint esversion:6
const mongoose = require("mongoose");

const dbService = () => {
const mongourl = process.env.mongourl;

console.log(mongourl);

mongoose.connect(mongourl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

}

exports.dbService = dbService;
