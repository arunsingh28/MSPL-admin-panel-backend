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
const user_model_1 = __importDefault(require("../../Models/user.model"));
const tokens_1 = __importDefault(require("../../Utils/tokens"));
const otpGenrator_1 = __importDefault(require("../../Utils/otpGenrator"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = __importDefault(require("../../../config/env"));
const sendOTP_1 = __importDefault(require("../../services/sendOTP"));
// login with phone number return otp to mobile number
const loginWithPhone = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isUser = yield user_model_1.default.findOne({ phone: req.body.phone }).exec();
    try {
        if (isUser) {
            // send the otp to mobile number
            (0, sendOTP_1.default)(isUser.oldOtp, isUser.phone);
            /*
            send the access token to the user with
            payload:  user id
            */
            const otpAccessToken = tokens_1.default.mobileOtpToken(isUser._id); // time 5 min
            // send the respoonse to client
            return res.status(200).json({
                message: 'OTP send to your mobile number',
                accessToken: otpAccessToken,
                success: true,
                isExists: true,
                data: null,
                stautsCode: res.statusCode
            });
        }
        else {
            // user not exist
            return res.status(200).json({
                message: 'User not found',
                success: false,
                isExists: false,
                data: null,
                stautsCode: res.statusCode
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message,
            success: false,
            statusCode: res.statusCode
        });
    }
});
const verifyOTP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { otp } = req.body;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    try {
        // debug the token
        const userId = jsonwebtoken_1.default.verify(token, env_1.default._jwt_mobile_token_secret_key);
        const user = yield user_model_1.default.findById(userId.id).exec();
        if (user) {
            // checking the otp
            if (otp == (user === null || user === void 0 ? void 0 : user.oldOtp)) {
                // send the access token to the user with 
                // payload:  user id      
                const accessToken = tokens_1.default.mobileToken(user._id);
                // reset the otp
                yield (0, otpGenrator_1.default)(user._id, res);
                // send the respoonse to client
                return res.status(200).json({
                    message: 'OTP verified',
                    accessToken,
                    success: true,
                    isExists: true,
                    isAuthenticated: true,
                    data: user,
                    stautsCode: res.statusCode
                });
            }
            else {
                return res.status(200).json({
                    message: 'Incorect OTP',
                    success: false,
                    isAuthenticated: false,
                    isExists: true,
                    stautsCode: res.statusCode
                });
            }
        }
    }
    catch (error) {
        if (error.name == 'TokenExpiredError')
            return res.status(401).json({
                message: 'OTP expired',
                success: false,
                isAuthenticated: false,
                statusCode: res.statusCode
            });
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message,
            success: false,
            isAuthenticated: false,
            statusCode: res.statusCode
        });
    }
});
exports.default = { loginWithPhone, verifyOTP };
