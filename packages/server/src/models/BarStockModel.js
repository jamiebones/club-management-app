"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BarStock = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var barStockSchema = new mongoose_1.default.Schema({
    supplierID: {
        type: String,
    },
    amount: {
        type: String,
    },
    saleType: {
        type: String,
        enum: ["CASH", "CREDIT"]
    },
    itemsSupplied: [{
            brand: String,
            quantity: Number,
            numberOfBottles: Number
        }],
    amountPaidToSupplier: {
        type: String
    },
    amountOwnedSupplier: {
        type: String
    },
    fullPaymentMade: {
        type: Boolean
    },
    date: {
        type: Date,
    },
});
var BarStock = mongoose_1.default.model("BarSales", barStockSchema);
exports.BarStock = BarStock;
