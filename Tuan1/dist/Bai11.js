"use strict";
// 11. Create a base class Animal. Extend Dog and Cat classes with methods bark() and meow().
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dog = exports.Cat = void 0;
class Animal {
    constructor(name) {
        this.name = name;
    }
}
class Cat extends Animal {
    bark() {
        console.log("meo meo");
    }
}
exports.Cat = Cat;
class Dog extends Animal {
    bark() {
        console.log("gau gau");
    }
}
exports.Dog = Dog;
