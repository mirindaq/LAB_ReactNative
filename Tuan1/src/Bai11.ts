// 11. Create a base class Animal. Extend Dog and Cat classes with methods bark() and meow().

class Animal {
    name : string;

    constructor( name : string ) {
        this.name = name;
    }
}

export class Cat extends Animal {

    bark() {
        console.log("meo meo")
    }
}

export class Dog extends Animal {

    bark() {
        console.log("gau gau")
    }
}
