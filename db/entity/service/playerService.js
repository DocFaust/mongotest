//jshint esversion:6
const player = require("./db/entity/player");

const savePlayer = async (firstName, lastName, email, activityLevel) => {
    const p = player.createPlayer(firstName, lastName, email, activityLevel);
    await p.save();
}
