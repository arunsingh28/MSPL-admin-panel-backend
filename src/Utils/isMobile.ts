import { Request } from "express";

/*
if these proprty true then device is windows or desktop or chrome

isAndroidNative : true
isAndroid : true
isiPhone : true
isiPhoneNative: true
isiPad: true
isBlackberry: true

*/

export default function isMobile(req: Request) {
    if (req.useragent?.isAndroid == true || req.useragent?.isAndroidTablet == true || 
        req.useragent?.isMobileNative == true || req.useragent?.isiPhone == true || 
        req.useragent?.isiPad == true || req.useragent?.isBlackberry == true) {
        return true
    } else false
}