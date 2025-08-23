"use strict";
// 26. Create a class Order with list of products. Add method to calculate total price.
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
class Order {
    constructor() {
        this.products = [];
    }
    addProduct(product) {
        this.products.push(product);
    }
    calculateTotalPrice() {
        return this.products.reduce((total, product) => total + product.price, 0);
    }
}
exports.Order = Order;
