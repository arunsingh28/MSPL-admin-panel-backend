"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const emp_Model_1 = __importDefault(require("./emp.Model"));
const loginScreen = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: emp_Model_1.default,
        unique: true
    },
    device: {
        type: Number
    },
    token: {
        type: String,
    },
    isLoggedin: {
        type: Boolean,
        default: false,
        require: true
    },
    from: {
        type: String
    },
    to: {
        type: String
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    firstLogin: {
        type: Date,
        default: Date.now
    }
});
const loginScreenSchema = mongoose_1.default.model('isLogedin', loginScreen);
exports.default = loginScreenSchema;
