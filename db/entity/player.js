//jshint esversion:6
const playerSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    activityLevel: Number,
  });

const Player = mongoose.model("Player", playerSchema);

const createPlayer = (firstName, lastName, email, activityLevel) => {
    const player = new Player({
        firstName: firstName,
        lastName: lastName,
        email: email,
        activityLevel: activityLevel
    });
    return player;
}

exports.createPlayer = createPlayer;