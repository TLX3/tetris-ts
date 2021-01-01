const readline = require("readline");
import { Shape, shapeTemplates } from "./shape";

class Game {
  private grid: string[][];
  private currentShape: Shape;

  constructor(private rows: number, private cols: number) {
    this.rows = rows;
    this.cols = cols;
    this.grid = new Array(n).fill([]).map(() => new Array(m).fill(""));
    this.currentShape = shapeTemplates[0];
    this.setCurrentShape();
  }

  private setCurrentShape() {
    // Pick random shape from templates and create a clone
    const randIdx = Math.floor(Math.random() * shapeTemplates.length);
    const template = shapeTemplates[randIdx];
    this.currentShape = new Shape(
      template.name,
      template.coords.map((coord) => coord)
    );
    this.currentShape.coords.forEach((coord) => {
      const [x, y] = coord;
      this.currentShape.coordSet.add(JSON.stringify([x, y]));
      this.grid[x][y] = "⬜️";
    });
  }

  public start() {
    // Continually listen for user's keypress to shift or rotate currentShape
    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);
    process.stdin.on("keypress", (str, key) => {
      if (key.name === "up") {
        this.rotateCurrentShape();
      } else if (["left", "right", "down"].includes(key.name)) {
        this.shiftCurrentShape(key.name);
      } else {
        process.exit();
      }
    });
    // Drop currentShape and check for row filled
    setInterval(() => {
      this.printGrid();
      this.shiftCurrentShape("down");
    }, 1000);
  }

  private isVerticalBoundary(x: number): boolean {
    return x < 0 || x === this.rows;
  }

  private isHorizontalBoundary(y: number): boolean {
    return y < 0 || y == this.cols;
  }

  // TODO
  private rotateCurrentShape() {
    // Transpose and reverse each row for a +90 degree rotation
    const notPossibleRotation = this.currentShape.coords.some((coord) => {
      const [x, y] = coord;
      return (
        this.isHorizontalBoundary(x) ||
        this.isVerticalBoundary(y) ||
        (this.grid[y][x] === "⬜️" &&
          !this.currentShape.coordSet.has(JSON.stringify([y, x])))
      );
    });
    // Rotation is possible?
    if (!notPossibleRotation) {
    }
  }

  private shiftCurrentShape(shiftDir: string) {
    let [dx, dy] = [0, 0];
    if (shiftDir === "down") {
      dx = 1;
    } else {
      dy = shiftDir === "left" ? -1 : 1;
    }
    let notPossibleMove = this.currentShape.coords.some((coord) => {
      const [x, y] = coord;
      return (
        (shiftDir === "down"
          ? this.isVerticalBoundary(x + dx)
          : this.isHorizontalBoundary(y + dy)) ||
        (this.grid[x + dx][y + dy] === "⬜️" &&
          !this.currentShape.coordSet.has(JSON.stringify([x + dx, y + dy])))
      );
    });
    if (shiftDir === "down") {
      // Cannot drop further with a vertical boundary or occupied block
      if (notPossibleMove) {
        this.setCurrentShape();
        this.clearFilledRows();
      }
    }
    if (!notPossibleMove) {
      // Remove previous occupied blocks
      this.currentShape.coords.forEach((coord) => {
        const [x, y] = coord;
        this.grid[x][y] = "";
        this.currentShape.coordSet.delete(JSON.stringify([x, y]));
      });
      // Update grid, coord, and coordSet
      this.currentShape.coords.forEach((coord, i) => {
        const [x, y] = coord;
        this.grid[x + dx][y + dy] = "⬜️";
        this.currentShape.coordSet.add(JSON.stringify([x + dx, y + dy]));
        this.currentShape.coords[i] = [x + dx, y + dy];
      });
    }
  }

  private clearFilledRows() {
    for (let i = this.rows - 1; i >= 0; i--) {
      const rowFilled = this.grid[i].every((val) => val === "⬜️");
      if (rowFilled) {
        for (let j = 0; j < this.cols; j++) {
          this.grid[i][j] = "";
        }
      }
    }
    // TODO: Check for cascading updates by floating debris
    let subsequentUpdate = false;
    // for (let i = this.rows - 1; i >= 0; i--) {
    //   for (let j = 0; j < this.cols; j++) {
    //     if (
    //       this.grid[i][j] === "⬜️" && !this.currentShape.coordSet.has(JSON.stringify([i, j]))
    //     ) {
    //       let k = i;
    //       this.grid[i][j] = "";
    //       while (k + 1 < this.rows && this.grid[k + 1][j] === "") {
    //         k += 1;
    //       }
    //       this.grid[k][j] = "⬜️";
    //       if (k != i) subsequentUpdate = true;
    //     }
    //   }
    // }
    // Another batch of updates might have occured
    if (subsequentUpdate) this.clearFilledRows();
  }

  private printGrid() {
    let prettyGrid = "";
    const pad = function (val: string, len: number) {
      let str = val;
      while (str.length < len) {
        str = " " + str;
      }
      return str;
    };
    for (let row of this.grid) {
      for (let val of row) {
        prettyGrid += pad(val, 2);
      }
      prettyGrid += "\n";
    }
    process.stdout.cursorTo(0);
    process.stdout.write(prettyGrid);
  }
}

// Create Game Object with n x m grid
const n = 24;
const m = 12;
const game = new Game(n, m);
game.start();
