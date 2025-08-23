// 13. Create an abstract class Shape with method area(). Implement Square and Circle.
abstract class Shape {
    abstract area(): number;
}
export class Square extends Shape { 
    sideLength: number;

    constructor(sideLength: number) {
        super();
        this.sideLength = sideLength;
    }

    area(): number {
        return this.sideLength * this.sideLength;
    }
}
export class Circle extends Shape {
    radius: number;

    constructor(radius: number) {
        super();
        this.radius = radius;
    }

    area(): number {
        return Math.PI * this.radius * this.radius;
    }
}