// 14. Create a base class Employee. Extend Manager and Developer with specific methods.

class Employee {
    name : string;
    constructor( name : string ) {
        this.name = name;
    }
}

export class Manager extends Employee {
    manage() {
        console.log(`${this.name} is Manager.`);
    }
}

export class Developer extends Employee {
    develop() {
        console.log(`${this.name} is Developer.`);
    }
}                                                                                               