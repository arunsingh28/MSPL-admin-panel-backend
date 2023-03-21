"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const RecipeSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    preparationTime: {
        type: Number,
        required: true,
    },
    ingredients: {
        type: Array,
        required: true,
    },
    // instructions: {
    //     type: String,
    //     required: true,
    // },
    image: {
        location: {
            type: String,
            required: true,
        },
        key: {
            type: String,
            required: true,
        }
    },
    status: {
        type: Boolean,
        default: true
    },
    sourceLink: {
        type: String,
        required: true,
    },
    nutritionName: {
        type: String,
        required: true,
    },
    tags: {
        type: Array,
        required: true,
    }
}, { timestamps: true });
const RecipeModel = mongoose_1.default.model('Recipe', RecipeSchema);
exports.default = RecipeModel;
