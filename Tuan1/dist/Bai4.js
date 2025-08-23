"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rectangle = void 0;
// 4. Create a class Rectangle with width and height. Write a method to calculate area and perimeter.
class Rectangle {
    width;
    height;
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    calculateArea() {
        return this.width * this.height;
    }
    caculatePerimeter() {
        return (this.width + this.height) * 2;
    }
}
exports.Rectangle = Rectangle;
//# sourceMappingURL=Bai4.js.map