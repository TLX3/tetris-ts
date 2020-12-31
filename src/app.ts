class Game {
  private grid: string[][];
  private currentShape: Shape;
  private shapeTypes: Shape[];

  constructor(private rows: number, private cols: number) {
    this.rows = rows;
    this.cols = cols;
    const arr = [];
    for (let i = 0; i < n; i++) {
      arr[i] = new Array(m).fill("");
    }
    this.grid = arr;

    // Tetrominoes
    const square = new Shape("square", [[0, Math.floor(this.cols / 2)], [0, Math.floor(this.cols / 2) + 1], [1, Math.floor(this.cols / 2)], [1, Math.floor(this.cols / 2) + 1]]);
    const straight = new Shape("straight", [[0, Math.floor(this.cols / 2) - 1], [0, Math.floor(this.cols / 2)], [0, Math.floor(this.cols / 2) + 1], [0, Math.floor(this.cols / 2) + 2]]);
    const T = new Shape("T", [[0, Math.floor(this.cols / 2) - 1], [0, Math.floor(this.cols / 2)], [0, Math.floor(this.cols / 2) + 1], [1, Math.floor(this.cols / 2)]]);
    const L = new Shape("L", [[0, Math.floor(this.cols / 2) - 1], [0, Math.floor(this.cols / 2)], [0, Math.floor(this.cols / 2) + 1], [1, Math.floor(this.cols / 2)]]);
    const skew = new Shape("skew", [[0, Math.floor(this.cols / 2) - 1], [0, Math.floor(this.cols / 2)], [1, Math.floor(this.cols / 2)], [1, Math.floor(this.cols / 2) + 1]]);
    const rev_L = new Shape("rev_L", [[0, Math.floor(this.cols / 2) - 1], [0, Math.floor(this.cols / 2)], [0, Math.floor(this.cols / 2) + 1], [1, Math.floor(this.cols / 2) + 1]]);
    const rev_skew = new Shape("rev_skew", [[0, Math.floor(this.cols / 2) - 1], [0, Math.floor(this.cols / 2)], [1, Math.floor(this.cols / 2) - 1], [1, Math.floor(this.cols / 2)]]);
    this.shapeTypes = [square, straight, T, L, skew, rev_L, rev_skew];

    this.currentShape = this.randomShape();
    this.dropCurrentShape();
  }

  public randomShape(): Shape {
    const randIdx = Math.floor(Math.random() * this.shapeTypes.length);
    return this.shapeTypes[randIdx];
  }

  public rotateCurrentShape(): void {

  }

  public shiftCurrentShape(): void {

  }

  private printGrid() {
    console.log("Current shape is: ", this.currentShape);
    this.grid.forEach((row, i) => {
      console.log(JSON.stringify(row).slice(1, -1));
    });
  }

  public dropCurrentShape(): void {
    if (this.currentShape && this.grid) {
      this.currentShape.coords.forEach(((coord) => {
        const [x, y] = coord;
        this.currentShape.coordSet.add(JSON.stringify([x, y]));
      }));
      let newShapeRequired = false;
      // Check for vertical boundary or collision with another block on next drop
      // Collided block cannot belong to current shape
      this.currentShape.coords.forEach(((coord) => {
        const [x, y] = coord;
        if (this.isVerticalBoundary(x + 1) ||
          (this.grid[x + 1][y] === "*" && !this.currentShape.coordSet.has(JSON.stringify([x + 1, y])))) {
          console.log("NEW SHAPE REQUIRED");
          newShapeRequired = true;
        }
      }));
      if (newShapeRequired) {
        this.currentShape = this.randomShape();
      } else {
        this.currentShape.coords.forEach(((coord) => {
          const [x, y] = coord;
          this.grid[x][y] = "";
          this.currentShape.coordSet.delete(JSON.stringify([x, y]));
          this.grid[x + 1][y] = "*";
        }));
      }
    }
    this.printGrid();
  }

  public isVerticalBoundary(x: number): boolean {
    return x < 0 || x === this.rows;
  }

  public isHorizontalBoundary(y: number): boolean {
    return y < 0 || y == this.cols;
  }

  public start(): void {
    // Have a loop running that updates currentShape
    // Update position of currentShape every second by descending one column below
    // If collision occurs with an occupied block then 
    // select random shape as currentShape
    // Shapes can be either a square, L, backwards L, |, z, backwards z, and T
    // Pick a random rotation out of 90, 180, 270, 360 degrees
  }
}

class Shape {
  public coordSet: Set<any>;
  constructor(public name: string, public coords: number[][]) {
    this.coordSet = new Set();
  }
}

// Create Game Object with n x m grid
const n = 24;
const m = 12
const game = new Game(n, m);
game.start();