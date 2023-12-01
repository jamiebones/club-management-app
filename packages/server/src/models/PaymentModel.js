"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payment = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var paymentSchema = new mongoose_1.default.Schema({
    receiverID: {
        type: mongoose_1.default.Schema.ObjectId,
    },
    amountPaid: {
        type: String,
    },
    paymentFor: {
        type: String,
    },
    paymentCategory: {
        type: String,
        enum: ["SALARY", "PALLIATIVE", "PURCHASES", "WORKMANSHIP"]
    },
    date: {
        type: Date,
    },
});
var Payment = mongoose_1.default.model("Payments", paymentSchema);
exports.Payment = Payment;
