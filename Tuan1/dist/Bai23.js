"use strict";
// 23. Create an interface Payment with method pay(amount). Implement CashPayment and
// CardPayment.
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardPayment = exports.CashPayment = void 0;
class CashPayment {
    pay(amount) {
        console.log(`Paid ${amount} using cash.`);
    }
}
exports.CashPayment = CashPayment;
class CardPayment {
    pay(amount) {
        console.log(`Paid ${amount} using card.`);
    }
}
exports.CardPayment = CardPayment;
