"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var userSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        index: {
            unique: true,
        },
    },
    password: {
        type: String,
    },
    bioDataId: {
        type: mongoose_1.default.Schema.ObjectId
    },
    userType: {
        type: String
    },
});
var User = mongoose_1.default.model("Users", userSchema);
exports.User = User;
