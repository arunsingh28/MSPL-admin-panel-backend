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
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const env_1 = __importDefault(require("../../config/env"));
const resetPassword_1 = __importDefault(require("../../mail_templates/resetPassword"));
const welcome_1 = __importDefault(require("../../mail_templates/welcome"));
const sendEmail = (to, type, name, otp, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: {
                user: env_1.default.MAIL_DOMAIN_ID,
                pass: env_1.default.MAIL_DOMAIN_PASS
            },
            tls: {
                ciphers: 'SSLv3'
            }
        });
        // reset password
        if (type === env_1.default.MAIL_RESET_PASSWORD) {
            const info = yield transporter.sendMail({
                from: env_1.default.MAIL_DOMAIN_ID,
                to: to,
                subject: 'Reset Password',
                html: (0, resetPassword_1.default)(name, otp)
            }).then((info) => {
                return info.response;
            })
                .catch((err) => {
                return err.message;
            });
        }
        // welcome
        if (type === env_1.default.MAIL_WELCOME) {
            const info = yield transporter.sendMail({
                from: env_1.default.MAIL_DOMAIN_ID,
                to: to,
                subject: 'Welcome',
                html: (0, welcome_1.default)(name, password)
            }).then((info) => {
                return info.response;
            })
                .catch((err) => {
                return err.message;
            });
        }
    }
    catch (err) {
        return err.message;
    }
});
exports.sendEmail = sendEmail;
