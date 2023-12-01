"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Supplier = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var supplierSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        maxlength: 100,
    },
    contact: [
        String
    ],
    address: {
        type: String,
    },
});
var Supplier = mongoose_1.default.model("Suppliers", supplierSchema);
exports.Supplier = Supplier;
