"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
if these proprty true then device is windows or desktop or chrome

isAndroidNative : true
isAndroid : true
isiPhone : true
isiPhoneNative: true
isiPad: true
isBlackberry: true

*/
function isMobile(req) {
    var _a, _b, _c, _d, _e, _f;
    if (((_a = req.useragent) === null || _a === void 0 ? void 0 : _a.isAndroid) == true || ((_b = req.useragent) === null || _b === void 0 ? void 0 : _b.isAndroidTablet) == true ||
        ((_c = req.useragent) === null || _c === void 0 ? void 0 : _c.isMobileNative) == true || ((_d = req.useragent) === null || _d === void 0 ? void 0 : _d.isiPhone) == true ||
        ((_e = req.useragent) === null || _e === void 0 ? void 0 : _e.isiPad) == true || ((_f = req.useragent) === null || _f === void 0 ? void 0 : _f.isBlackberry) == true) {
        return true;
    }
    else
        false;
}
exports.default = isMobile;
