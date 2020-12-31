"use strict";
class Game {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
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
        this.shapeTypes = [square, straight, T, L, skew, rev_L, rev_skew];
        this.currentShape = this.randomShape();
        this.currentShape.coords.forEach(((coord) => {
            const [x, y] = coord;
            this.currentShape.coordSet.add(JSON.stringify([x, y]));
            this.grid[x][y] = "⬜️";
        }));
        this.dropCurrentShape();
    }
    randomShape() {
        const randIdx = Math.floor(Math.random() * this.shapeTypes.length);
        return this.shapeTypes[randIdx];
    }
    rotateCurrentShape() {
    }
    shiftCurrentShape() {
    }
    printGrid() {
        console.log("Current shape is: ", this.currentShape);
        let prettyGrid = "";
        this.grid.forEach((row, i) => {
            row.forEach((value) => {
                if (value === "⬜️") {
                    prettyGrid += value;
                }
                else {
                    prettyGrid += ' ';
                }
            });
            prettyGrid += '\n';
        });
        console.log(prettyGrid);
    }
    dropCurrentShape() {
        if (this.currentShape && this.grid) {
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
                this.currentShape = this.randomShape();
                this.currentShape.coords.forEach(((coord) => {
                    const [x, y] = coord;
                    this.currentShape.coordSet.add(JSON.stringify([x, y]));
                    this.grid[x][y] = "⬜️";
                }));
            }
            else {
                console.log("NO COLLISIONS");
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
        }
        this.printGrid();
    }
    isVerticalBoundary(x) {
        return x < 0 || x === this.rows;
    }
    isHorizontalBoundary(y) {
        return y < 0 || y == this.cols;
    }
    start() {
        // Have a loop running that updates currentShape
        // Update position of currentShape every second by descending one column below
        // If collision occurs with an occupied block then 
        // select random shape as currentShape
        // Shapes can be either a square, L, backwards L, |, z, backwards z, and T
        // Pick a random rotation out of 90, 180, 270, 360 degrees
    }
}
class Shape {
    constructor(name, coords) {
        this.name = name;
        this.coords = coords;
        this.coordSet = new Set();
    }
}
// Create Game Object with n x m grid
const n = 24;
const m = 12;
const game = new Game(n, m);
game.start();
