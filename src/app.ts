const readline = require('readline');

class Game {
  private grid: string[][];
  private currentShape: Shape;
  private shapeTemplates: Shape[];

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
    const L = new Shape("L", [[0, Math.floor(this.cols / 2) - 1], [0, Math.floor(this.cols / 2)], [0, Math.floor(this.cols / 2) + 1], [1, Math.floor(this.cols / 2) - 1]]);
    const skew = new Shape("skew", [[0, Math.floor(this.cols / 2) - 1], [0, Math.floor(this.cols / 2)], [1, Math.floor(this.cols / 2)], [1, Math.floor(this.cols / 2) + 1]]);
    const rev_L = new Shape("rev_L", [[0, Math.floor(this.cols / 2) - 1], [0, Math.floor(this.cols / 2)], [0, Math.floor(this.cols / 2) + 1], [1, Math.floor(this.cols / 2) + 1]]);
    const rev_skew = new Shape("rev_skew", [[0, Math.floor(this.cols / 2) - 1], [0, Math.floor(this.cols / 2)], [1, Math.floor(this.cols / 2) - 2], [1, Math.floor(this.cols / 2) - 1]]);
    this.shapeTemplates = [square, straight, T, L, skew, rev_L, rev_skew];
    this.currentShape = square;
    this.setCurrentShape();
  }

  public setCurrentShape(): void {
    // Pick random shape from templates and create a clone
    const randIdx = Math.floor(Math.random() * this.shapeTemplates.length);
    const template = this.shapeTemplates[randIdx];
    this.currentShape = new Shape(template.name, template.coords.map(coord => coord));
    this.currentShape.coords.forEach(((coord) => {
      const [x, y] = coord;
      this.currentShape.coordSet.add(JSON.stringify([x, y]));
      this.grid[x][y] = "⬜️";
    }));
  }

  public rotateCurrentShape(): void {

  }

  public shiftCurrentShape(shiftDir: string): void {

  }

  private printGrid() {
    console.log("Current shape is: ", this.currentShape);
    let prettyGrid = "";
    this.grid.forEach((row, i) => {
      row.forEach((value) => {
        if (value === "⬜️") {
          prettyGrid += value;
        } else {
          prettyGrid += ' ';
        }
      });
      prettyGrid += '\n';
    });
    console.log(prettyGrid);
  }

  public dropCurrentShape(): void {
    let newShapeRequired = false;
    // Check for vertical boundary or collision
    this.currentShape.coords.forEach(((coord) => {
      const [x, y] = coord;
      if (this.isVerticalBoundary(x + 1) ||
        (this.grid[x + 1][y] === "⬜️" && !this.currentShape.coordSet.has(JSON.stringify([x + 1, y])))) {
        newShapeRequired = true;
      }
    }));

    if (newShapeRequired) {
      console.log("NEW SHAPE REQUIRED");
      this.setCurrentShape();
    } else {
      console.log("NO COLLISIONS")
      this.currentShape.coords.forEach(((coord) => {
        const [x, y] = coord;
        // Remove previous occupied blocks
        this.grid[x][y] = "";
        this.currentShape.coordSet.delete(JSON.stringify([x, y]));
      }));
      this.currentShape.coords.forEach(((coord, i) => {
        const [x, y] = coord;
        this.grid[x + 1][y] = "⬜️";
        this.currentShape.coordSet.add(JSON.stringify([x + 1, y]));
        this.currentShape.coords[i] = [x + 1, y];
      }));
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
    // Continually listen for user's keypress to shift or rotate currentShape
    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);
    process.stdin.on('keypress', (str, key) => {
      if (key.name === "up") {
        this.rotateCurrentShape();
      } else if (['left', 'right', 'down'].includes(key.name)) {
        this.shiftCurrentShape(key.name);
      } else {
        process.exit();
      }
    });
    // Drop currentShape
    // Then check for row clearance
    setInterval(() => {
      this.dropCurrentShape();
    }, 1000);
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