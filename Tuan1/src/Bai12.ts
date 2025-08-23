// 12. Define interfaces Flyable and Swimmable. Implement them in Bird and Fish classes.

interface Flyable {
    fly(): void;
}
interface Swimmable {
    swim(): void;
}

export class Bird implements Flyable {
    fly(): void {
        console.log("Bird is flying");
    }
}

export class Fish implements Swimmable {
    swim(): void {
        console.log("Fish is swimming");
    }   
}