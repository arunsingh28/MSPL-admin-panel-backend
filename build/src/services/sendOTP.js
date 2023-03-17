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
const needle_1 = __importDefault(require("needle"));
function sendOTP(otp, phone) {
    needle_1.default.get(`https://smsjust.com/sms/user/urlsms.php?username=missionsports&pass=user@123&senderid=MSAAPP&message=Dear customer, Your OTP number is ${otp} Don't share it with anyone - Mission Sports &dest_mobileno=${phone}&msgtype=TXT&response=Y&dltentityid=1201159168063308595&dlttempid=1607100000000186990&tmid=1602100000000004471`, (error, response) => __awaiter(this, void 0, void 0, function* () {
        return response.body;
    }));
}
exports.default = sendOTP;
