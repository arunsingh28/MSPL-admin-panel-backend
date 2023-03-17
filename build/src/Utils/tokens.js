"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = __importDefault(require("../../config/env"));
const accessToken = (id, role) => {
    return jsonwebtoken_1.default.sign({ id, role }, env_1.default._jwt_access_token_secret_key, {
        expiresIn: env_1.default._jwt_access_token_expire_time
    });
};
const refreshToken = (id, role) => {
    return jsonwebtoken_1.default.sign({ id, role }, env_1.default._jwt_refresh_token_secret_key, {
        expiresIn: env_1.default._jwt_refresh_token_expire_time
    });
};
const loginToken = (id, role) => {
    return jsonwebtoken_1.default.sign({ id, role }, env_1.default._jwt_login_token_secret_key, {
        expiresIn: env_1.default._jwt_login_token_expire_time
    });
};
const mobileToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, env_1.default._jwt_mobile_token_secret_key, {
        expiresIn: env_1.default._jwt_mobile_token_expire_time
    });
};
const mobileOtpToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, env_1.default._jwt_mobile_token_secret_key, {
        expiresIn: env_1.default._jwt_mobile_otp_token_expire_time
    });
};
exports.default = { accessToken, refreshToken, loginToken, mobileToken, mobileOtpToken };
