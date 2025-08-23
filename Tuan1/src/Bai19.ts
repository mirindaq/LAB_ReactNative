// 19. Demonstrate method overriding using polymorphism with Animal and subclasses.

class Animal {
    speak(): void {
        console.log("The animal makes a sound.");
    }
}

export class Dog extends Animal {
    speak(): void {
        console.log("gau gau");
    }
}

export class Cat extends Animal {
    speak(): void {
        console.log("meo meo");
    }
}
