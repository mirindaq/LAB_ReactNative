// 30. Create a class School with list of Students and Teachers. Add method to display info.

import { Student } from "./Bai2";
import { Teacher } from "./Bai27";

export class School {
    private students: Student[] = [];
    private teachers: Teacher[] = [];
    
    addStudent(student: Student) {
        this.students.push(student);
    }
    
    addTeacher(teacher: Teacher) {
        this.teachers.push(teacher);
    }
    
    displayInfo() {
        console.log("Students:");
        this.students.forEach(student => student.displayInfo());
        console.log("Teachers:");
        this.teachers.forEach(teacher => teacher.displayInfo());
    }
}
