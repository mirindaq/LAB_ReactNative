// 3. Create a class Car with properties brand, model, year. Write a method to show car info.
export class Car {
    brand: string;
    model: string;
    year: number;

    constructor(brand: string, model: string, year: number) {
        this.brand = brand;
        this.model = model;
        this.year = year;
    }

    showCarInfo(): void {
        console.log(`Car Infomation - Brand: ${this.brand}, Model: ${this.model}, Year: ${this.year}`);
    }
}