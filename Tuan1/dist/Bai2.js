"use strict";
// 2. Write a class Student extending Person with an additional attribute grade. Add a method to
// display all info.
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = void 0;
const Bai1_1 = require("./Bai1");
class Student extends Bai1_1.Person {
    grade;
    constructor(name, age, grade) {
        super(name, age);
        this.grade = grade;
    }
    displayAllInfo() {
        console.log(`Name: ${this.name}, Age: ${this.age}, Grade: ${this.grade}`);
    }
}
exports.Student = Student;
//# sourceMappingURL=Bai2.js.map