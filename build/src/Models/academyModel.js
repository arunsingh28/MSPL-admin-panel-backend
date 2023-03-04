"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const academySchema = new mongoose_1.default.Schema({
    academyName: {
        type: String,
        required: true,
    },
    academyEmail: {
        type: String,
        required: true,
        unique: true,
    },
    uid: {
        type: String,
        required: true,
        unique: true,
    },
    password: String,
    referalCode: String,
    sports: {
        isCricket: Boolean,
        isTennis: Boolean,
        isFootball: Boolean,
        isBadminton: Boolean,
        isBasketball: Boolean,
        other: String,
    },
    contestPerson: {
        name: String,
        number: Number,
        email: String,
    },
    address: {
        city: String,
        address: String,
    },
    links: {
        google: String,
        website: String,
        playO: String,
    },
    coches: []
});
exports.default = mongoose_1.default.model("Academy", academySchema);
