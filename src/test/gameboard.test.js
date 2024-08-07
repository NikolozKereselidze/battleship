const Gameboard = require("../components/Gameboard");
const Ship = require("../components/Ship");

let gameboard;

beforeEach(() => {
  gameboard = new Gameboard(10);
});

describe("isValidPlacement", () => {
  test("if out out bounds shouls return false", () => {
    const ship = new Ship(3);
    expect(gameboard.isValidPlacement(ship, -1, 0, "horizontal")).toBe(false);
    expect(gameboard.isValidPlacement(ship, 0, -1, "horizontal")).toBe(false);
    expect(gameboard.isValidPlacement(ship, 10, 0, "horizontal")).toBe(false);
    expect(gameboard.isValidPlacement(ship, 0, 10, "horizontal")).toBe(false);
  });

  test("should return false for placement that exceeds board size horizontally", () => {
    const ship = new Ship(5);
    expect(gameboard.isValidPlacement(ship, 6, 0, "horizontal")).toBe(false);
  });

  test("should return false for placement that exceeds board size vertically", () => {
    const ship = new Ship(3);
    expect(gameboard.isValidPlacement(ship, 0, 8, "vertical")).toBe(false);
  });

  test("should return true for valid placements", () => {
    const ship = new Ship(3);
    expect(gameboard.isValidPlacement(ship, 0, 0, "horizontal")).toBe(true);
    expect(gameboard.isValidPlacement(ship, 0, 0, "vertical")).toBe(true);
  });
});

describe("pupulateBoard", () => {
  test("should populate the board with the correct ships", () => {
    gameboard.populateBoard();

    expect(gameboard.board).toBeDefined();
  });
});

describe("receive attacks", () => {
  test("should return false if board was already attacked on specified coordinates", () => {
    gameboard.receiveAttack(2, 3);
    expect(gameboard.receiveAttack(2, 3)).toBe(false);
  });

  test("if attack was missed, push it to the missedAttacks array", () => {
    const gameboard = new Gameboard();
    gameboard.receiveAttack(0, 0);
    expect(gameboard.missedAttacks).toContainEqual([0, 0]);
  });

  test("should call hit function if target was hit", () => {
    const ship = new Ship(5);
    const gameboard = new Gameboard();
    gameboard.placeShip(ship, 0, 0, "horiozntal");
    gameboard.receiveAttack(0, 0);
    gameboard.receiveAttack(0, 0);

    expect(ship.hits).toBe(1);
  });
});
