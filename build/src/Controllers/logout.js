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
Object.defineProperty(exports, "__esModule", { value: true });
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cookie = req.cookies['rf_session'];
    // const isMatch = await loggedinModel.findOne({ token: cookie }).exec()
    // console.log('logout', isMatch)
    // remove cookies
    try {
        // isMatch.isLoggedin = false
        // if (isMatch.device === 1) {
        //     isMatch.isLoggedin = false
        // }
        // isMatch.token = ''
        // isMatch.device = (isMatch.device - 1)
        // await isMatch.save()
        res.clearCookie('rf_session');
        return res.json({ success: true, message: 'logout successfully' });
    }
    catch (error) {
        console.log(error);
        res.clearCookie('rf_session');
        return res.json({ success: true, message: 'Something went wrong' });
    }
});
exports.default = logout;
