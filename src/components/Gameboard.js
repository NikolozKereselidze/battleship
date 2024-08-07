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

  populateBoard() {
    const array = [
      new Ship(5),
      new Ship(4),
      new Ship(3),
      new Ship(3),
      new Ship(2),
    ];

    array.forEach((el) => {
      let placed = false;
      while (!placed) {
        const x = Math.round(Math.random() * this.size);
        const y = Math.round(Math.random() * this.size);
        const direction = Math.random() > 0.5 ? "horizontal" : "vertical";

        if (this.isValidPlacement(el, x, y, direction)) {
          this.placeShip(el, x, y, direction);
          placed = true;
        }
      }
    });
  }
}

module.exports = Gameboard;
