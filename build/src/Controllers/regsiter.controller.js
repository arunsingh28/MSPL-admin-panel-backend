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
exports.generatePassword = void 0;
const env_1 = __importDefault(require("../../config/env"));
const emp_Model_1 = __importDefault(require("../Models/emp.Model"));
const tokens_1 = __importDefault(require("../Utils/tokens"));
const isMobile_1 = __importDefault(require("../Utils/isMobile"));
const bcrypt_1 = __importDefault(require("bcrypt"));
// genrate 8 char randmon password
const generatePassword = () => {
    var pass = '';
    var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
        'abcdefghijklmnopqrstuvwxyz0123456789@#$';
    for (let i = 1; i <= 8; i++) {
        var char = Math.floor(Math.random()
            * str.length + 1);
        pass += str.charAt(char);
    }
    return pass;
};
exports.generatePassword = generatePassword;
// auto generate id and password
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { email, phone, name, id, role } = req.body;
    // data check if not null
    // if (!firstName || !lastName || !email || !password || !phone || !dob || !gender || !state || !city) {
    if (!name || !email || !phone) {
        return res.json({ message: 'please fill all the details', success: false });
    }
    else {
        // save to db
        try {
            // check user is already registerd
            const isExist = yield emp_Model_1.default.findOne({ email: email, empId: id }).exec();
            if (isExist) {
                return res.status(409).json({ success: false, message: 'Already registerd. Please login' });
            }
            // genrate password
            const password = (0, exports.generatePassword)();
            const referral_code = Math.random().toString(36).substr(5);
            const encrypt = yield bcrypt_1.default.hash(password, bcrypt_1.default.genSaltSync(10));
            const newUser = new emp_Model_1.default({
                // firstName, lastName, email, phone, dob, gender, password,
                // address: { city, state, street },
                name, email, phone, password: encrypt, role, empId: id, referral_code
            });
            // save to db
            yield newUser.save();
            // create refresh tooken with _id for 1 day
            const refreshToken = tokens_1.default.refreshToken(newUser._id, role);
            // create access token with _id of 10 min
            const accessToken = tokens_1.default.accessToken(newUser._id, role);
            const isMobile = (0, isMobile_1.default)(req);
            if (isMobile) {
                return res.status(201).json({ success: true, message: 'User register successfully', password, token: refreshToken, });
            }
            // send the accessToken with cookie
            res.cookie('rf_session', refreshToken, {
                httpOnly: true,
                maxAge: env_1.default._register_rf_Cookie,
                sameSite: 'none',
                secure: true
            });
            /*
            send success mail to user
                ..
                ..
                ..
            */
            return res.status(201).json({ success: true, message: 'User register successfully', password, token: accessToken });
        }
        catch (error) {
            if ((_a = error.errors) === null || _a === void 0 ? void 0 : _a.phone) {
                return res.status(500).json({ success: false, message: error.errors.phone.properties.message });
            }
            if ((_b = error.errors) === null || _b === void 0 ? void 0 : _b.email) {
                return res.status(500).json({ success: false, message: error.errors.email.properties.message });
            }
            if (error.code === 11000) {
                // clear if any session there
                res.clearCookie('rf_session', {
                    httpOnly: true,
                    maxAge: env_1.default._register_rf_Cookie,
                    sameSite: 'none',
                    secure: true
                });
                return res.status(409).json({ success: false, message: 'Already registerd. Please login' });
            }
            else {
                // clear if any session there
                res.clearCookie('rf_session', {
                    httpOnly: true,
                    maxAge: env_1.default._register_rf_Cookie,
                    sameSite: 'none',
                    secure: true
                });
                // send the error message
                return res.status(500).json({ success: false, message: error === null || error === void 0 ? void 0 : error.message });
            }
        }
    }
});
exports.default = registerUser;
