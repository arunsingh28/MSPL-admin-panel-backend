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
const emp_Model_1 = __importDefault(require("../../Models/emp.Model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const tokens_1 = __importDefault(require("../../Utils/tokens"));
const env_1 = __importDefault(require("../../../config/env"));
const loginWithPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email)
        return res.json({ message: 'please enter you register email.', success: false });
    if (!password)
        return res.json({ message: 'please enter you register password.', success: false });
    const user = yield emp_Model_1.default.findOne({ email }).exec();
    if (!user)
        return res.json({ message: 'email is not registerd', success: false });
    try {
        // comparing passowrd with hash password
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch)
            return res.json({ message: 'Invalid Credentials', success: false });
        // refresh token and access token
        const refreshToken = tokens_1.default.refreshToken(user._id, user.role);
        const accessToken = tokens_1.default.accessToken(user._id, user.role);
        // save the token in db and update the token and time 
        res.cookie('rf_session', refreshToken, {
            maxAge: env_1.default._rf_cookies_max_age,
            secure: true,
            httpOnly: true,
            sameSite: 'none',
        });
        return res.status(200).json({
            success: true, message: 'login successfully', accessToken,
            data: user,
            isAuthenticated: true,
            user: {
                name: user.name,
                email: user.email,
                role: user.role,
                _id: user._id,
                isMute: user.isMute
            }
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'something went wrong', success: false });
    }
});
exports.default = { loginWithPassword };
