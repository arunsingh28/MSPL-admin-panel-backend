"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("./logger"));
const errorHandler = () => {
    process.on('unhandledRejection', (err) => {
        logger_1.default.logEvents(err.message, 'UnhandleReject.csv');
        console.log('\n==== unhandle Rejection fail =====\n', err);
        // uncaoughtException
        process.on('uncaughtException', (err) => {
            logger_1.default.logEvents(err.message, 'UncaughtException.csv');
            console.log('\n==== uncaught Exception fail =====\n', err);
            // server shutdown
            process.exit(1);
        });
    });
};
exports.default = errorHandler;
