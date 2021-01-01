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

  public setCurrentShape(): void {
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

  public rotateCurrentShape(): void {
    // Transpose and reverse each row for a +90 degree rotation
    for (let i = 0; i < this.currentShape.coords.length; i++) {
      const [x, y] = this.currentShape.coords[i];
      let temp = this.grid[x][y];
      this.grid[x][y] = this.grid[y][x];
      this.grid[y][x] = temp;
    }
  }

  public shiftCurrentShape(shiftDir: string): void {
    let [dx, dy] = [0, 0];
    switch (shiftDir) {
      case "left":
        dy = -1;
        break;
      case "right":
        dy = 1;
        break;
      case "down":
        dx = 1;
        break;
      default:
        break;
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
      // Check for vertical boundary or occupied block
      if (notPossibleMove) {
        // Cannot drop further with a boundary or occupied block
        this.setCurrentShape();
      }
    }
    if (!notPossibleMove) {
      // Move is possible
      this.currentShape.coords.forEach((coord) => {
        const [x, y] = coord;
        // Remove previous occupied blocks
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
    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);
    process.stdout.write(prettyGrid);
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
}

// Create Game Object with n x m grid
const n = 24;
const m = 12;
const game = new Game(n, m);
game.start();
