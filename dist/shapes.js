"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shape = void 0;
const cols = 12;
// Tetrocolsinoes
const square = new Shape("square", [
    [0, Math.floor(cols / 2)],
    [0, Math.floor(cols / 2) + 1],
    [1, Math.floor(cols / 2)],
    [1, Math.floor(cols / 2) + 1],
]);
const straight = new Shape("straight", [
    [0, Math.floor(cols / 2) - 1],
    [0, Math.floor(cols / 2)],
    [0, Math.floor(cols / 2) + 1],
    [0, Math.floor(cols / 2) + 2],
]);
const T = new Shape("T", [
    [0, Math.floor(cols / 2) - 1],
    [0, Math.floor(cols / 2)],
    [0, Math.floor(cols / 2) + 1],
    [1, Math.floor(cols / 2)],
]);
const L = new Shape("L", [
    [0, Math.floor(cols / 2) - 1],
    [0, Math.floor(cols / 2)],
    [0, Math.floor(cols / 2) + 1],
    [1, Math.floor(cols / 2) - 1],
]);
const skew = new Shape("skew", [
    [0, Math.floor(cols / 2) - 1],
    [0, Math.floor(cols / 2)],
    [1, Math.floor(cols / 2)],
    [1, Math.floor(cols / 2) + 1],
]);
const rev_L = new Shape("rev_L", [
    [0, Math.floor(cols / 2) - 1],
    [0, Math.floor(cols / 2)],
    [0, Math.floor(cols / 2) + 1],
    [1, Math.floor(cols / 2) + 1],
]);
const rev_skew = new Shape("rev_skew", [
    [0, Math.floor(cols / 2) - 1],
    [0, Math.floor(cols / 2)],
    [1, Math.floor(cols / 2) - 2],
    [1, Math.floor(cols / 2) - 1],
]);
class Shape {
    constructor(name, coords) {
        this.name = name;
        this.coords = coords;
        this.coordSet = new Set();
    }
}
exports.Shape = Shape;
//# sourceMappingURL=shapes.js.map