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
const user_Model_1 = __importDefault(require("../Models/user.Model"));
const regsiterEndUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, phone, dob, height, weight, password, sex } = req.body;
    if (!name || !email || !phone || !dob || !height || !weight || !sex) {
        return res.status(400).json({ message: 'Please fill all the fields', success: false });
    }
    try {
        const newUser = new user_Model_1.default({
            name,
            email,
            phone,
            dob,
            sex,
            measurement: {
                height,
                weight,
            },
            password
        });
        const savedUser = yield newUser.save();
        return res.status(200).json({ message: 'User Registered Successfully', success: true, data: savedUser });
    }
    catch (error) {
        if (error.code === 11000) {
            return res.status(200).json({ message: 'Email or Phone already exists', error: error.message, success: false });
        }
        return res.status(500).json({ message: 'Internal Server Error', error: error.message, success: false });
    }
});
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_Model_1.default.find();
        return res.status(200).json(users);
    }
    catch (error) {
        return res.status(500).json({ message: 'Internal Server Error', error: error.message, success: false });
    }
});
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_Model_1.default.findById(req.params.id);
        return res.status(200).json(user);
    }
    catch (error) {
        return res.status(500).json({ message: 'Internal Server Error', error: error.message, success: false });
    }
});
exports.default = { regsiterEndUser, getAllUsers, getUserById };
