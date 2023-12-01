"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Members = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var memberSchema = new mongoose_1.default.Schema({
    memberID: {
        type: String,
        index: {
            unique: true,
        },
    },
    title: {
        type: String,
        maxlength: 50,
    },
    name: {
        type: String,
        maxlength: 100,
    },
    jobTitle: {
        type: String,
        maxlength: 100,
    },
    nextOfKin: {
        type: String
    },
    contact: [
        String
    ],
    email: {
        type: String
    },
    memberShipType: {
        type: String,
        enum: ["FULL", "ASSOCIATE"]
    },
    employer: {
        type: String
    },
    sex: {
        type: String,
        enum: ["MALE", "FEMALE"]
    },
    birthDay: {
        type: String //format => day=>month eg 10-05 10 of May
    },
});
var Members = mongoose_1.default.model("Members", memberSchema);
exports.Members = Members;
