"use strict";
// 12. Define interfaces Flyable and Swimmable. Implement them in Bird and Fish classes.
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fish = exports.Bird = void 0;
class Bird {
    fly() {
        console.log("Bird is flying");
    }
}
exports.Bird = Bird;
class Fish {
    swim() {
        console.log("Fish is swimming");
    }
}
exports.Fish = Fish;
