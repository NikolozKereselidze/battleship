const Ship = require("./Ship");

class Gameboard {
  constructor() {
    this.size = 10;
    this.board = Array.from({ length: this.size }, () =>
      Array.from({ length: this.size }, () => null)
    );
    this.ships = [];
    this.missedAttacks = [];
    this.hitAttacks = [];
  }
}

module.exports = Gameboard;
