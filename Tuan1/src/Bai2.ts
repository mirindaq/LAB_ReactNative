// 2. Write a class Student extending Person with an additional attribute grade. Add a method to
// display all info.

import { Person } from "./Bai1";

export class Student extends Person {
    grade: string;

    constructor(name: string, age: number, grade: string) {
        super(name, age);
        this.grade = grade;
    }

    displayAllInfo(): void {
        console.log(`Name: ${this.name}, Age: ${this.age}, Grade: ${this.grade}`);
    }
}