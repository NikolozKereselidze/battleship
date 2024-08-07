const Gameboard = require("../components/Gameboard");
const Ship = require("../components/Ship");

let gameboard;

beforeEach(() => {
  gameboard = new Gameboard(10);
});
