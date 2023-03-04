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
const logedin_Model_1 = __importDefault(require("../Models/logedin.Model"));
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cookie = req.cookies['rf_session'];
    console.log('cookies', cookie);
    const isMatch = yield logedin_Model_1.default.findOne({ token: cookie }).exec();
    // remove cookies
    try {
        isMatch.isLoggedin = false;
        isMatch.token = '';
        yield isMatch.save();
        res.clearCookie('rf_session');
        return res.json({ success: true, message: 'logout successfully' });
    }
    catch (error) {
        console.log(error);
        return res.json({ success: false, message: 'Something went wrong' });
    }
});
exports.default = logout;
