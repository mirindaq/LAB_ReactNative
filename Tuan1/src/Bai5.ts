// 5. Create a class BankAccount with balance. Add methods deposit() and withdraw().
export class BankAccount {
    balance : number;

    constructor( balance : number ) {
        this.balance = balance;
    }

    deposit(amount: number): void {
        if (amount > 0) {
            this.balance += amount;
            console.log(`Deposited: ${amount}. New balance: ${this.balance}`);
        } else {
            console.log("Deposit amount must be positive.");
        }
    }   

    withdraw(amount: number): void {
        if (amount > 0 && amount <= this.balance) {
            this.balance -= amount;
            console.log(`Withdrew: ${amount}. New balance: ${this.balance}`);
        } else {
            console.log("Invalid withdraw amount.");
        }
    }
}