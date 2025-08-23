"use strict";
// 20. Write a Vehicle interface and implement it in Car and Bike classes.
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bike = exports.Car = void 0;
class Car {
    drive() {
        console.log("Car is driving");
    }
}
exports.Car = Car;
class Bike {
    drive() {
        console.log("Bike is riding");
    }
}
exports.Bike = Bike;
