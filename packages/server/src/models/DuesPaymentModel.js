"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DuesPayment = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var duesPaymentSchema = new mongoose_1.default.Schema({
    memberID: {
        type: String,
    },
    amountPaid: {
        type: String,
    },
    paymentFor: [
        {
            month: String,
            year: String
        }
    ],
    paymentType: {
        type: String,
        enum: ["BANK", "CASH"]
    },
    date: {
        type: Date
    },
});
var DuesPayment = mongoose_1.default.model("DuesPayments", duesPaymentSchema);
exports.DuesPayment = DuesPayment;
