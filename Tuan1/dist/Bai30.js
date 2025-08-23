"use strict";
// 30. Create a class School with list of Students and Teachers. Add method to display info.
Object.defineProperty(exports, "__esModule", { value: true });
exports.School = void 0;
class School {
    constructor() {
        this.students = [];
        this.teachers = [];
    }
    addStudent(student) {
        this.students.push(student);
    }
    addTeacher(teacher) {
        this.teachers.push(teacher);
    }
    displayInfo() {
        console.log("Students:");
        this.students.forEach(student => student.displayInfo());
        console.log("Teachers:");
        this.teachers.forEach(teacher => teacher.displayInfo());
    }
}
exports.School = School;
