"use strict";
class Game {
    constructor(row, cols, grid, currentShape) {
        this.row = row;
        this.cols = cols;
        this.grid = grid;
        this.currentShape = currentShape;
        this.row = n;
        this.cols = m;
        const arr = [];
        for (let i = 0; i < n; i++) {
            arr[i] = new Array(m);
        }
        this.grid = arr;
        this.currentShape = undefined;
    }
    start() {
        const shapeTypes = [];
        // Select random shape as currentShape
        // Shapes can be either a square, L, backwards L, |, z, backwards z, and T
        // Pick a random rotation out of 90, 180, 270, 360 degrees
        // Update grid with coordinates of currentShape in the top centered by marking
        // block as occupied with *
        // Update position of currentShape every second by descending one column below
        // If collision occurs with an occupied block then create a new currentShape
    }
}
class Shape {
    constructor(coords) {
        this.coords = coords;
    }
}
// Create Game Object with n x m grid
const n = 24;
const m = 12;
const game = new Game(n, m);
game.start();
