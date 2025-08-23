"use strict";
// 19. Demonstrate method overriding using polymorphism with Animal and subclasses.
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cat = exports.Dog = void 0;
class Animal {
    speak() {
        console.log("The animal makes a sound.");
    }
}
class Dog extends Animal {
    speak() {
        console.log("gau gau");
    }
}
exports.Dog = Dog;
class Cat extends Animal {
    speak() {
        console.log("meo meo");
    }
}
exports.Cat = Cat;
