"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Coache = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const coacheSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: [true, 'this field required'],
        unique: true,
        match: [
            /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
        ],
    },
    phone: {
        type: Number,
        required: true,
        unique: true,
        match: [
            /^[0-9]{10}$/,
        ]
    },
    academy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Academy'
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    sports: {
        isCricket: {
            type: Boolean,
            default: false,
        },
        isTennis: {
            type: Boolean,
            default: false,
        },
        isFootball: {
            type: Boolean,
            default: false,
        },
        isBadminton: {
            type: Boolean,
            default: false,
        },
        isBasketball: {
            type: Boolean,
            default: false,
        },
        other: {
            type: String,
            default: '',
        }
    }
});
exports.Coache = mongoose_1.default.model('Coache', coacheSchema);
