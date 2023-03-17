"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ingridienentsModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ingridienentsSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    unit: {
        type: String,
        required: true,
    },
    calories: {
        type: Number,
        required: true,
    },
    fat: {
        type: Number,
        required: true,
    },
    carbs: {
        type: Number,
        required: true,
    },
    protein: {
        type: Number,
        required: true,
    },
});
exports.ingridienentsModel = mongoose_1.default.model('ingridienents', ingridienentsSchema);
