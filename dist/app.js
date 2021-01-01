"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const readline = require("readline");
const shape_1 = require("./shape");
class Game {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.rows = rows;
        this.cols = cols;
        this.grid = new Array(n).fill([]).map(() => new Array(m).fill(""));
        this.currentShape = shape_1.shapeTemplates[0];
        this.setCurrentShape();
    }
    setCurrentShape() {
        // Pick random shape from templates and create a clone
        const randIdx = Math.floor(Math.random() * shape_1.shapeTemplates.length);
        const template = shape_1.shapeTemplates[randIdx];
        this.currentShape = new shape_1.Shape(template.name, template.coords.map((coord) => coord));
        this.currentShape.coords.forEach((coord) => {
            const [x, y] = coord;
            this.currentShape.coordSet.add(JSON.stringify([x, y]));
            this.grid[x][y] = "⬜️";
        });
    }
    rotateCurrentShape() { }
    shiftCurrentShape(shiftDir) {
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
            return ((shiftDir === "down"
                ? this.isVerticalBoundary(x + dx)
                : this.isHorizontalBoundary(y + dy)) ||
                (this.grid[x + dx][y + dy] === "⬜️" &&
                    !this.currentShape.coordSet.has(JSON.stringify([x + dx, y + dy]))));
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
            this.currentShape.coords.forEach((coord, i) => {
                const [x, y] = coord;
                this.grid[x + dx][y + dy] = "⬜️";
                this.currentShape.coordSet.add(JSON.stringify([x + dx, y + dy]));
                this.currentShape.coords[i] = [x + dx, y + dy];
            });
        }
    }
    printGrid() {
        let prettyGrid = "";
        for (let i = 0; i < this.grid[0].length; i++)
            prettyGrid += "-";
        this.grid.forEach((row, i) => {
            row.forEach((value, i) => {
                if (value === "⬜️") {
                    prettyGrid += value;
                }
                else {
                    prettyGrid += " ";
                }
            });
            prettyGrid += "\n";
        });
        for (let i = 0; i < this.grid[0].length; i++)
            prettyGrid += "-";
        process.stdout.clearLine(0);
        process.stdout.cursorTo(0);
        process.stdout.write(prettyGrid);
    }
    isVerticalBoundary(x) {
        return x < 0 || x === this.rows;
    }
    isHorizontalBoundary(y) {
        return y < 0 || y == this.cols;
    }
    start() {
        // Continually listen for user's keypress to shift or rotate currentShape
        readline.emitKeypressEvents(process.stdin);
        process.stdin.setRawMode(true);
        process.stdin.on("keypress", (str, key) => {
            if (key.name === "up") {
                this.rotateCurrentShape();
            }
            else if (["left", "right", "down"].includes(key.name)) {
                this.shiftCurrentShape(key.name);
            }
            else {
                process.exit();
            }
        });
        // Drop currentShape
        // Then check for row filled
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
//# sourceMappingURL=app.js.map