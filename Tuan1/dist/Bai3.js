"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Car = void 0;
// 3. Create a class Car with properties brand, model, year. Write a method to show car info.
class Car {
    brand;
    model;
    year;
    constructor(brand, model, year) {
        this.brand = brand;
        this.model = model;
        this.year = year;
    }
    showCarInfo() {
        console.log(`Car Infomation - Brand: ${this.brand}, Model: ${this.model}, Year: ${this.year}`);
    }
}
exports.Car = Car;
//# sourceMappingURL=Bai3.js.map