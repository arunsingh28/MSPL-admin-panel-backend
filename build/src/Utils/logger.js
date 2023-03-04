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
const date_fns_1 = require("date-fns");
const uuid_1 = require("uuid");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const getTimeStamp = () => {
    return new Date().toISOString();
};
// file logger message
const logEvents = (message, fileName) => __awaiter(void 0, void 0, void 0, function* () {
    const dateTime = `${(0, date_fns_1.format)(new Date(), 'yyyy-MM-dd HH:mm:ss')}`;
    const logMessage = `${dateTime}, ${(0, uuid_1.v4)()}, ${message}\n`;
    try {
        if (!fs_1.default.existsSync(path_1.default.join(__dirname, '../../logs'))) {
            fs_1.default.mkdirSync(path_1.default.join(__dirname, '../../logs'));
            const heading = `Date,Id,Message\n`;
            fs_1.default.writeFileSync(path_1.default.join(__dirname, '../../logs', fileName), heading);
        }
        else
            fs_1.default.appendFile(path_1.default.join(__dirname, '../../logs', fileName), logMessage, (err) => {
                if (err)
                    throw err;
            });
    }
    catch (error) {
        console.log('\n:::::::File Error:::::::::\n', error.message, '\n\n');
    }
});
// file logger
const logger = (req, res, next) => {
    logEvents(`${req.method} ${req.path}`, 'reqLog.csv');
    next();
};
// terminal logger
const info = (namespace, message, object) => {
    if (object) {
        console.log(`[${getTimeStamp()}] [INFO] [${namespace}] ${message}`, object);
    }
    else {
        console.log(`[${getTimeStamp()}] [INFO] [${namespace}] ${message}`);
    }
};
exports.default = { logEvents, logger, info };
