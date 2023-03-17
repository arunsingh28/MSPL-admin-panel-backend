"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const allowedOrigin_1 = __importDefault(require("./allowedOrigin"));
const corsOptions = {
    origin: (origin, callback) => {
        console.log("****ORIGIN****", origin);
        // if origin exit in whitelist 
        /*
        -1 : not found orgin in whitelist
        0 : found origin in whitelist

        for developemnt and testing origin
        for production !origin
        */
        if (allowedOrigin_1.default.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        }
        else {
            const err = new Error('Not allowed by CORS');
            callback(err.message);
        }
    },
    optionSuccessStatus: 200
};
exports.default = corsOptions;
