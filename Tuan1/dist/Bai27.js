"use strict";
// 27. Create a class Teacher that extends Person. Add subject attribute and introduce method.
Object.defineProperty(exports, "__esModule", { value: true });
exports.Teacher = void 0;
const Bai1_1 = require("./Bai1");
class Teacher extends Bai1_1.Person {
    constructor(name, age, subject) {
        super(name, age);
        this.subject = subject;
    }
    introduce() {
        console.log(`Giao vien ten ${this.name}, tuoi ${this.age} , va mon day ${this.subject}.`);
    }
}
exports.Teacher = Teacher;
