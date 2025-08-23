// 7. Write a class User with private property name and getter/setter.

export class User {
    private name: string;
    private age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    getName(): string {
        return this.name;
    }

    setName(name: string): void {
        this.name = name;
    }

    getAge(): number {
        return this.age;
    }
    
    setAge(age: number): void {
        this.age = age;
    }
 
}

