class Game {
  constructor(private rows: number, private cols: number,
    private grid?: string[][], private currentShape?: Shape, private shapeTypes?: Shape[]) {
    this.rows = rows;
    this.cols = cols;
    const arr = [];
    for (let i = 0; i < n; i++) { arr[i] = new Array(m); }
    this.grid = arr;

    // Tetrominoes
    const square = new Shape([[0, Math.floor(this.cols / 2)], [0, Math.floor(this.cols / 2) + 1], [1, Math.floor(this.cols / 2)], [1, Math.floor(this.cols / 2) + 1]]);
    const straight = new Shape([[0, Math.floor(this.cols / 2) - 1], [0, Math.floor(this.cols / 2)], [0, Math.floor(this.cols / 2) + 1], [0, Math.floor(this.cols / 2) + 2]]);
    const T = new Shape([[0, Math.floor(this.cols / 2) - 1], [0, Math.floor(this.cols / 2)], [0, Math.floor(this.cols / 2) + 1], [1, Math.floor(this.cols / 2)]]);
    const L = new Shape([[0, Math.floor(this.cols / 2) - 1], [0, Math.floor(this.cols / 2)], [0, Math.floor(this.cols / 2) + 1], [1, Math.floor(this.cols / 2) - 1]]);
    const skew = new Shape([[0, Math.floor(this.cols / 2) - 1], [0, Math.floor(this.cols / 2)], [1, Math.floor(this.cols / 2)], [1, Math.floor(this.cols / 2) + 1]]);
    const rev_L = new Shape([[0, Math.floor(this.cols / 2) - 1], [0, Math.floor(this.cols / 2)], [0, Math.floor(this.cols / 2) + 1], [1, Math.floor(this.cols / 2) + 1]]);
    const rev_skew = new Shape([[0, Math.floor(this.cols / 2) - 1], [0, Math.floor(this.cols / 2)], [1, Math.floor(this.cols / 2) - 1], [1, Math.floor(this.cols / 2)]]);
    this.shapeTypes = [square, straight, T, L, skew, rev_L, rev_skew];

    this.currentShape = undefined;
  }

  public randomShape(): Shape | undefined {
    if (this.shapeTypes) {
      const randIdx = Math.floor(Math.random() * this.shapeTypes.length);
      return this.shapeTypes[randIdx];
    }
  }

  public start() {
    // Have a loop running that updates currentShape
    // Update position of currentShape every second by descending one column below
    // If collision occurs with an occupied block then create a new currentShape
    // Select random shape as currentShape
    // Shapes can be either a square, L, backwards L, |, z, backwards z, and T
    // Pick a random rotation out of 90, 180, 270, 360 degrees
  }
}

class Shape {
  constructor(private coords: number[][]) { }
}

// Create Game Object with n x m grid
const n = 24;
const m = 12
const game = new Game(n, m);
game.start();