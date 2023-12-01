"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Staff = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var staffSchema = new mongoose_1.default.Schema({
    employeeID: {
        type: String,
        index: {
            unique: true,
        },
    },
    name: {
        type: String,
        maxlength: 100,
    },
    jobTitle: {
        type: String,
        maxlength: 100,
    },
    dateOfEmployment: {
        type: Date
    },
    nextOfKin: {
        name: String,
        contact: [String]
    },
    contact: [
        String
    ],
    employmentType: {
        type: String,
        enum: ["FULL TIME", "PART TIME", "CONTRACT"]
    },
    employmentStatus: {
        type: String,
        enum: ["ACTIVE", "INACTIVE", "SUSPENDED"]
    },
    sex: {
        type: String,
        enum: ["MALE", "FEMALE"]
    },
});
var Staff = mongoose_1.default.model("Staff", staffSchema);
exports.Staff = Staff;
