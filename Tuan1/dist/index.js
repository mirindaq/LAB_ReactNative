"use strict";
// import { Account } from './Bai10';
// import { Animal } from './Bai9';
// import { Product } from './Bai8';
// import { Person } from "./Bai1.js";
// import { Student } from "./Bai2.js";
// import { Car } from "./Bai3";
// import { Rectangle } from "./Bai4";
// import { BankAccount } from "./Bai5";
// import { Book } from "./Bai6";
// import { User } from "./Bai7";
// import { Bird, Fish } from "./Bai12";
// import { Cat, Dog } from "./Bai11";
// import { Circle, Square } from "./Bai13";
// import { Developer, Manager } from "./Bai14";
// import { Library } from "./Bai15";
// import { Bike, Car } from "./Bai20";
// import { Repository } from "./Bai21";
Object.defineProperty(exports, "__esModule", { value: true });
const Bai22_1 = require("./Bai22");
// import { Cat, Dog } from "./Bai19";
// import { MathUtil } from "./Bai18";
// import { Box } from "./Bai16";
// 1. Create a class Person with attributes name and age. Write a method to display this information.
// const person = new Person("Hoang", 21);
// person.displayInfo(); 
// 2. Write a class Student extending Person with an additional attribute grade. Add a method to
// display all info.
// const student = new Student("Hoang", 21, "A");
// student.displayAllInfo();
// 3. Create a class Car with properties brand, model, year. Write a method to show car info.
// const car = new Car("Honda", "UD17", 2025);
// car.showCarInfo();
// 4. Create a class Rectangle with width and height. Write a method to calculate area and perimeter.
// const rectangle = new Rectangle(10,20);
// console.log(`Area: ${rectangle.calculateArea()}`);
// console.log(`Perimeter: ${rectangle.caculatePerimeter()}`);
// 5. Create a class BankAccount with balance. Add methods deposit() and withdraw().
// const bankAccount = new BankAccount(100);
// bankAccount.deposit(200);
// bankAccount.withdraw(300);
// 6. Create a class Book with attributes title, author, year.
// const book = new Book("Sach hay", "Hoang", 2025);
// book.displayInfo()
// 7. Write a class User with private property name and getter/setter.
// const user = new User("Hoang",21);
// console.log("Ten cu: " + user.getName() )
// user.setName("Viet Hoang")
// console.log("Ten moi: " + user.getName() )
// 8. Create a Product class with name, price. Create an array of products and filter products with
// price > 100.
// const products: Product[] = new Array();
// products.push(new Product("Banh", 150));
// products.push(new Product("Keo", 50));
// products.push(new Product("Ho lo", 200));
// console.log(products.filter((x) =>(x.price > 100)))
// 9. Define an interface Animal with name and method sound().
// Animal
// 10. Create a class Account with public, private and readonly fields.
// Account
// 11. Create a base class Animal. Extend Dog and Cat classes with methods bark() and meow().
// const dog = new Dog("Cho");
// dog.bark();
// const cat = new Cat("Meo");
// cat.bark();
// 12. Define interfaces Flyable and Swimmable. Implement them in Bird and Fish classes.
// const bird = new Bird();
// bird.fly();
// const fish = new Fish();
// fish.swim();
// 13. Create an abstract class Shape with method area(). Implement Square and Circle.
// const square = new Square(10);
// console.log(`Area of square: ${square.area()}`);
// const circle = new Circle(10);
// console.log(`Area of circle: ${circle.area()}`);
// 14. Create a base class Employee. Extend Manager and Developer with specific methods.
// const manager = new Manager("Hoang");
// manager.manage();
// const developer = new Developer("Viet Hoang");
// developer.develop();
// 15. Create a Library class that can store Book and User objects. Add method to add books.
// const library = new Library();
// 16. Create a generic class Box that can store any type of value.
// const boxNumber = new Box<number>(10);
// console.log("boxNumber: " + boxNumber.getValue());
// const boxString = new Box<string>("Hello");
// console.log("boxString: " + boxString.getValue());
// 17. Write a singleton Logger class that logs messages to console.
//logger
// 18. Create a static class MathUtil with methods add(), subtract(), multiply(), divide().
// console.log("MathUtil Add: " + MathUtil.add(10,5));
// console.log("MathUtil Subtract: " + MathUtil.subtract(10,5));
// console.log("MathUtil Multiply: " + MathUtil.multiply(10,5));
// console.log("MathUtil Divide: " + MathUtil.divide(10,5));
// 19. Demonstrate method overriding using polymorphism with Animal and subclasses.
// const dog = new Dog();
// dog.speak();
// const cat = new Cat();
// cat.speak();
// 20. Write a Vehicle interface and implement it in Car and Bike classes.
// const car = new Car();
// car.drive();
// const bike = new Bike();
// bike.drive();
// 21. Create a generic Repository class with methods add(), getAll().
// const repositoryString = new Repository<string>();
// repositoryString.add("Item 1");
// repositoryString.add("Item 2");
// const repositoryNumber = new Repository<number>();
// repositoryNumber.add(100);
// repositoryNumber.add(200);
// console.log("String Repository: ", repositoryString.getAll());
// console.log("Number Repository: ", repositoryNumber.getAll());
// 22. Create a class Stack with push, pop, peek, isEmpty methods.
const stack = new Bai22_1.Stack();
stack.push(1);
stack.push(2);
stack.push(3);
console.log(stack.peek());
console.log(stack.pop());
console.log(stack.isEmpty());
// 23. Create an interface Payment with method pay(amount). Implement CashPayment and
// CardPayment.
// 24. Create an abstract class Appliance with method turnOn(). Implement Fan and AirConditioner.
// 25. Create a class Shape with a static method describe().
// 26. Create a class Order with list of products. Add method to calculate total price.
// 27. Create a class Teacher that extends Person. Add subject attribute and introduce method.
// 28. Create a class Animal with protected method makeSound(). Extend Dog and Cat to override it.
// 29. Create an interface Movable with method move(). Implement it in Car and Robot.
// 30. Create a class School with list of Students and Teachers. Add method to display info.
