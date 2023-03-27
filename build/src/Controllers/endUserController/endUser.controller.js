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
const user_model_1 = __importDefault(require("../../Models/user.model"));
// Register End User
const regsiterEndUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, phone, dob, height, weight, gender } = req.body;
    if (!name || !email || !phone || !dob || !height || !weight || !gender) {
        return res.status(400).json({ message: 'Please fill all the fields', success: false, stautsCode: 400 });
    }
    try {
        const newUser = new user_model_1.default({
            name,
            email,
            phone,
            dob,
            gender,
            measurement: {
                height,
                weight,
            }
        });
        const savedUser = yield newUser.save();
        return res.status(200).json({ message: 'User Registered Successfully', success: true, data: savedUser, stautsCode: 200 });
    }
    catch (error) {
        if (error.code === 11000) {
            return res.status(200).json({ message: 'Email or Phone already exists', error: error.message, success: false, statusCode: 200 });
        }
        return res.status(500).json({ message: 'Internal Server Error', error: error.message, success: false, statusCode: 500 });
    }
});
// Get all users
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_model_1.default.find();
        return res.status(200).json(users);
    }
    catch (error) {
        return res.status(500).json({ message: 'Internal Server Error', error: error.message, success: false, statusCode: 500 });
    }
});
// get user by ID
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findById(req.params.id);
        return res.status(200).json(user);
    }
    catch (error) {
        return res.status(500).json({ message: 'Internal Server Error', error: error.message, success: false, statusCode: 500 });
    }
});
exports.default = { regsiterEndUser, getAllUsers, getUserById };
