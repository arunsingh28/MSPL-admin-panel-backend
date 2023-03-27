"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../Models/user.model"));
function otpGenrator(_id, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // genrate 6 digit new otp
        const otp = Math.floor(100000 + Math.random() * 900000);
        // fetch old otp
        const user = yield user_model_1.default.findById(_id);
        try {
            // update otp in DB
            yield user_model_1.default.findOneAndUpdate({ _id }, {
                $set: {
                    oldOtp: user === null || user === void 0 ? void 0 : user.otp,
                    otp
                }
            });
        }
        catch (error) {
            console.log('****Error from OTP genrator modules****', error);
            return res.status(500).json({
                message: 'server error',
                statusCode: res.statusCode
            });
        }
    });
}
exports.default = otpGenrator;
