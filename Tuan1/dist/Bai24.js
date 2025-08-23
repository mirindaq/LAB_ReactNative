"use strict";
// 24. Create an abstract class Appliance with method turnOn(). Implement Fan and AirConditioner.
Object.defineProperty(exports, "__esModule", { value: true });
exports.AirConditioner = exports.Fan = void 0;
class Appliance {
}
class Fan extends Appliance {
    turnOn() {
        console.log("Fan is on");
    }
}
exports.Fan = Fan;
class AirConditioner extends Appliance {
    turnOn() {
        console.log("Air conditioner is on");
    }
}
exports.AirConditioner = AirConditioner;
