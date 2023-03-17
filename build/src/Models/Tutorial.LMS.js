"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tutorial = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const tutorialSchema = new mongoose_1.default.Schema({
    TutorialTitle: {
        type: String,
        required: true,
        unique: true,
    },
    TutorialDescription: {
        type: String,
        required: true,
    },
    intiater: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'emp',
    },
    moduleNumber: Number,
    module: [
        {
            moduleTitle: {
                type: String,
                // required: true,
            },
            moduleDescription: {
                type: String,
                // required: true,
            },
        }
    ],
    chapter: [
        {
            chapterTitle: {
                type: String,
                // required: true,
            },
        }
    ],
    thumbnail: {
        type: String,
        // required: true,
    },
    category: {
        type: String,
        // required: true,
    },
    isDeleted: {
        type: Boolean,
        // default: false,
    },
}, { timestamps: true });
exports.Tutorial = mongoose_1.default.model('Tutorial', tutorialSchema);
