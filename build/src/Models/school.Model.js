"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const schoolSchema = new mongoose_1.default.Schema({
    schoolName: {
        type: String,
        required: true
    },
    schoolAddress: {
        schoolArea: {
            type: String,
            required: true
        },
        schoolCity: {
            type: String,
            required: true
        },
        pinCode: {
            type: Number,
            required: true
        }
    },
    contestPerson: {
        contactName: {
            type: String,
            required: true
        },
        contactPhone: {
            type: Number,
            required: true,
            unique: true
        },
        contactEmail: {
            type: String,
            required: true,
            unique: true
        }
    },
    sports: {
        isCricket: {
            type: Boolean,
            default: false
        },
        isTennis: {
            type: Boolean,
            default: false
        },
        isFootball: {
            type: Boolean,
            default: false
        },
        isBadminton: {
            type: Boolean,
            default: false
        },
        isBasketball: {
            type: Boolean,
            default: false
        },
        other: {
            type: String,
            default: 'NA'
        }
    }
}, { timestamps: true });
const schoolModel = mongoose_1.default.model('school', schoolSchema);
exports.default = schoolModel;
