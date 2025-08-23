"use strict";
// 28. Create a class Animal with protected method makeSound(). Extend Dog and Cat to override it.
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cat = exports.Dog = void 0;
class Animal {
    makeSound() {
        console.log("Animal makes a sound");
    }
}
class Dog extends Animal {
    makeSound() {
        console.log("Dog gau gau");
    }
}
exports.Dog = Dog;
class Cat extends Animal {
    makeSound() {
        console.log("Cat meo meo");
    }
}
exports.Cat = Cat;
