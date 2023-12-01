"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DrinksBank = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var drinksBankSchema = new mongoose_1.default.Schema({
    memberID: {
        type: String,
    },
    staffID: {
        type: String,
    },
    items: {
        type: [{ "brand": String, "quantity": Number, "id": Number }]
    },
    drinksLeft: {
        type: [{ brand: String, quantity: Number }]
    },
    collectedDates: {
        type: [{ staffId: String, date: Date }]
    },
    dateBanked: {
        type: Date
    }
});
var DrinksBank = mongoose_1.default.model("DrinksBank", drinksBankSchema);
exports.DrinksBank = DrinksBank;
