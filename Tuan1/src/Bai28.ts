// 28. Create a class Animal with protected method makeSound(). Extend Dog and Cat to override it.

class Animal {
    protected makeSound() {
        console.log("Animal makes a sound");
    }
}

export class Dog extends Animal {
    makeSound() {
        console.log("Dog gau gau");
    }
}

export class Cat extends Animal {
    makeSound() {
        console.log("Cat meo meo");
    }
}

