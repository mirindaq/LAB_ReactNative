"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
class Product {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
    displayInfo() {
        console.log(`Name: ${this.name}, Price: ${this.price}`);
    }
}
exports.Product = Product;
