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
const emp_Model_1 = __importDefault(require("../Models/emp.Model"));
const tokens_1 = __importDefault(require("../Utils/tokens"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = __importDefault(require("../../config/env"));
const otpGenrator_1 = __importDefault(require("../Utils/otpGenrator"));
const isMobile_1 = __importDefault(require("../Utils/isMobile"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const sendOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { phone } = req.body;
    if (phone.length <= 9) {
        return res.json({ message: 'Enter valid phone number', agent: req.useragent });
    }
    if (!phone)
        return res.json({ message: 'please enter you register number', agent: req.useragent });
    const user = yield emp_Model_1.default.findOne({ phone }).exec();
    if (user) {
        try {
            const phoneToken = tokens_1.default.loginToken(user._id, user.role);
            // https cookie
            res.cookie('ph_session', phoneToken, {
                httpOnly: true,
                maxAge: env_1.default._login_token_cookie,
                sameSite: 'none',
                secure: true
            });
            // change the otp
            (0, otpGenrator_1.default)(user === null || user === void 0 ? void 0 : user._id, res);
            // get device type
            const isMobile = (0, isMobile_1.default)(req);
            if (isMobile) {
                return res.status(200).json({ otp: user.otp, token: phoneToken, message: 'OTP send to your number' });
            }
            return res.status(200).json({ otp: user.otp, message: 'OTP send to your mobile number' });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'server error' });
        }
    }
    else {
        // not found the phone
        return res.status(404).json({ success: false, message: `User not found with ${phone}` });
    }
});
const verifyOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { otp } = req.body;
    const cookie = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.ph_session;
    if (!otp)
        return res.json({ message: 'please enter you register number' });
    if (!cookie)
        return res.json({ message: 'session expire login agian. ', code: 1 });
    try {
        const decoded = jsonwebtoken_1.default.verify(cookie, env_1.default._jwt_login_token_secret_key);
        const user = yield emp_Model_1.default.findById(decoded.id).exec();
        const role = decoded.role;
        // create accessToken 
        const accessToken = tokens_1.default.accessToken(user === null || user === void 0 ? void 0 : user._id, role);
        // create refreshtoken
        const refreshToken = tokens_1.default.refreshToken(user === null || user === void 0 ? void 0 : user._id, role);
        if (otp != (user === null || user === void 0 ? void 0 : user.oldOtp)) {
            return res.json({ message: 'incorrect OTP. ', code: 0 });
        }
        // delete previous cookie
        res.clearCookie('ph_session', {
            httpOnly: true,
            sameSite: 'none',
            secure: true
        });
        // create new rf cookie
        res.cookie('rf_session', refreshToken, {
            httpOnly: true,
            sameSite: 'none',
            maxAge: env_1.default._register_rf_Cookie,
            secure: true
        });
        // for mobile send refreshtoken
        const isMobile = (0, isMobile_1.default)(req);
        if (isMobile) {
            return res.status(200).json({
                success: true,
                message: 'login successfully',
                refreshToken,
                // data: { firstName: user?.firstName, lastName: user?.lastName }
                data: { name: user === null || user === void 0 ? void 0 : user.name }
            });
        }
        // for desktop send accesstoken 
        return res.status(200).json({
            success: true,
            message: 'login successfully',
            accessToken,
            // data: { firstName: user?.firstName, lastName: user?.lastName }
            data: { name: user === null || user === void 0 ? void 0 : user.name }
        });
    }
    catch (error) {
        // clear previous rf_token
        res.clearCookie('rf_session', {
            httpOnly: true,
            sameSite: 'none',
            secure: true,
        });
        return res.status(404).json({ success: false, message: error.message });
    }
});
const verifyLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.params;
    if (!token)
        return res.json({ success: true });
    try {
        const decoded = jsonwebtoken_1.default.verify(token, env_1.default._jwt_access_token_secret_key);
        const user = yield emp_Model_1.default.findById(decoded.id).exec();
        if (user) {
            return res.json({
                user: {
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    _id: user._id
                },
                token,
                success: true,
            });
        }
        return res.json({ success: true });
    }
    catch (error) {
        return res.json({ success: true });
    }
});
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { oldPassword, newPassword } = req.body;
    const { _id } = req.params;
    const isEmp = yield emp_Model_1.default.findOne({ _id }).exec();
    const isMatch = yield bcrypt_1.default.compare(oldPassword, isEmp.password);
    if (!isMatch) {
        return res.json({ message: 'old password is incorrect', success: false });
    }
    else {
        const decrpt = yield bcrypt_1.default.hash(newPassword, 10);
        const update = yield emp_Model_1.default.findByIdAndUpdate(_id, { password: decrpt }).exec();
        if (update) {
            return res.json({ message: 'password change successfully', success: true });
        }
        else {
            return res.json({ message: 'something went wrong', success: false });
        }
    }
});
exports.default = { sendOtp, verifyOtp, verifyLogin, changePassword };
