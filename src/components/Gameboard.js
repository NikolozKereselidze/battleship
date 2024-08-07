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

  placeShip(ship, x, y, direction) {
    if (!this.isValidPlacement(ship, x, y, direction)) return;
    if (direction === "horizontal") {
      for (let i = 0; i < ship.length; i++) {
        this.board[y][x + i] = ship;
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        this.board[y + i][x] = ship;
      }
    }

    this.ships.push(ship);
  }

  isValidPlacement(ship, x, y, direction) {
    if (x < 0 || x >= this.size || y < 0 || y >= this.size) return false;

    if (direction === "horizontal") {
      if (x > this.size - ship.length) return false;

      for (let i = 0; i < ship.length; i++) {
        if (this.board[y][x + i] !== null) return false;
      }
    } else if (direction === "vertical") {
      if (y > this.size - ship.length) return false;

      for (let i = 0; i < ship.length; i++) {
        if (this.board[y + i][x] !== null) return false;
      }
    }

    return true;
  }
}

module.exports = Gameboard;
