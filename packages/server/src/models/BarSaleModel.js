"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BarSales = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var barSaleSchema = new mongoose_1.default.Schema({
    memberID: {
        type: String,
    },
    staffID: {
        type: String,
    },
    staffUsername: {
        type: String,
    },
    items: [{
            brand: String,
            quantity: Number
        }],
    date: {
        type: Date,
    },
    amount: {
        type: String
    },
    paymentType: {
        String: String,
        enum: ["CASH", "BANK", "CREDIT"]
    },
    saleType: {
        type: String,
        enum: ["PRESIDENTIAL", "NORMAL"]
    },
});
var BarSales = mongoose_1.default.model("BarSales", barSaleSchema);
exports.BarSales = BarSales;
