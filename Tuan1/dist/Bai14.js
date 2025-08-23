"use strict";
// 14. Create a base class Employee. Extend Manager and Developer with specific methods.
Object.defineProperty(exports, "__esModule", { value: true });
exports.Developer = exports.Manager = void 0;
class Employee {
    constructor(name) {
        this.name = name;
    }
}
class Manager extends Employee {
    manage() {
        console.log(`${this.name} is Manager.`);
    }
}
exports.Manager = Manager;
class Developer extends Employee {
    develop() {
        console.log(`${this.name} is Developer.`);
    }
}
exports.Developer = Developer;
