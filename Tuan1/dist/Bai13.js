"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Circle = exports.Square = void 0;
// 13. Create an abstract class Shape with method area(). Implement Square and Circle.
class Shape {
}
class Square extends Shape {
    constructor(sideLength) {
        super();
        this.sideLength = sideLength;
    }
    area() {
        return this.sideLength * this.sideLength;
    }
}
exports.Square = Square;
class Circle extends Shape {
    constructor(radius) {
        super();
        this.radius = radius;
    }
    area() {
        return Math.PI * this.radius * this.radius;
    }
}
exports.Circle = Circle;
