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
const env_1 = __importDefault(require("../../config/env"));
const email_1 = require("../Utils/email");
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        if (!email || email === '') {
            return res.status(400).json({ message: 'Email is required', success: false });
        }
        const isUser = yield emp_Model_1.default.findOne({ email: email }).exec();
        if (!isUser) {
            return res.status(400).json({ message: 'Email is not registered', success: false });
        }
        // send the session token to the user's email
        const token = tokens_1.default.accessToken(isUser._id, isUser.role);
        const url = `${env_1.default.prod_url}/reset-password/&token${token}`;
        // send mail with defined transport object
        const info = yield (0, email_1.sendEmail)(email, env_1.default.MAIL_RESET_PASSWORD, isUser.name);
        if (info === 'Message sent: %s') {
            return res.status(200).json({ message: 'Reset password link sent to your email', success: true });
        }
        return res.status(500).json({ message: 'Something went wrong', success: false });
    }
    catch (err) {
        return res.status(500).json({ message: err.message, success: false });
    }
});
exports.default = { forgotPassword };
