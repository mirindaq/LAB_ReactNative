"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankAccount = void 0;
// 5. Create a class BankAccount with balance. Add methods deposit() and withdraw().
class BankAccount {
    balance;
    constructor(balance) {
        this.balance = balance;
    }
    deposit(amount) {
        if (amount > 0) {
            this.balance += amount;
            console.log(`Deposited: ${amount}. New balance: ${this.balance}`);
        }
        else {
            console.log("Deposit amount must be positive.");
        }
    }
    withdraw(amount) {
        if (amount > 0 && amount <= this.balance) {
            this.balance -= amount;
            console.log(`Withdrew: ${amount}. New balance: ${this.balance}`);
        }
        else {
            console.log("Invalid withdraw amount.");
        }
    }
}
exports.BankAccount = BankAccount;
//# sourceMappingURL=Bai5.js.map