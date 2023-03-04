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
const xlsx_1 = __importDefault(require("xlsx"));
const fs_1 = __importDefault(require("fs"));
const school_Model_1 = __importDefault(require("../Models/school.Model"));
const emp_Model_1 = __importDefault(require("../Models/emp.Model"));
const regsiter_controller_1 = require("./regsiter.controller");
const registerSchoolWithFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // check if file is uploaded
        if (req.file === undefined) {
            return res.status(400).send("Please upload a exel file!");
        }
        else {
            // read excel file 
            const workbook = xlsx_1.default.readFile(req.file.path);
            const sheet_name_list = workbook.SheetNames;
            const xlData = xlsx_1.default.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
            // check the file format is valid or not
            if (!xlData[0].schoolName) {
                return res.status(403).json({ message: 'Incorrect Template', success: false });
            }
            xlData.map((data, index) => __awaiter(void 0, void 0, void 0, function* () {
                if (!data.schoolName || !data.schoolArea || !data.schoolCity || !data.pinCode || !data.contactName || !data.contactPhone || !data.contactEmail)
                    return res.status(403).json({ message: 'All fields are required', success: false });
                try {
                    const newSchool = new school_Model_1.default({
                        schoolName: data.schoolName,
                        schoolAddress: {
                            schoolArea: data.schoolArea,
                            schoolCity: data.schoolCity,
                            pinCode: data.pinCode
                        },
                        contestPerson: {
                            contactName: data.contactName,
                            contactPhone: data.contactPhone,
                            contactEmail: data.contactEmail
                        },
                        sports: {
                            isCricket: data === null || data === void 0 ? void 0 : data.isCricket,
                            isTennis: data === null || data === void 0 ? void 0 : data.isTennis,
                            isFootball: data === null || data === void 0 ? void 0 : data.isFootball,
                            isBadminton: data === null || data === void 0 ? void 0 : data.isBadminton,
                            isBasketball: data === null || data === void 0 ? void 0 : data.isBasketball,
                            other: data === null || data === void 0 ? void 0 : data.other
                        }
                    });
                    // save the file into db
                    const isDone = yield newSchool.save();
                    if (!isDone)
                        return res.status(500).json({ message: 'Something went wrong', success: false });
                    return res.status(201).json({ message: xlData.length + ' records are saved', success: true });
                }
                catch (error) {
                    console.log(error);
                    // check the error code for duplicate email or phone number
                    if (error.code === 11000)
                        return res.status(403).json({ message: 'Email or Phone number is already exists of ' + data.schoolName, success: false });
                    return res.status(500).json({ message: error.message, success: false });
                }
            }));
            // delete the file after saving it into db
            const path = (_a = req === null || req === void 0 ? void 0 : req.file) === null || _a === void 0 ? void 0 : _a.path;
            fs_1.default.unlinkSync(path);
        }
    }
    catch (error) {
        console.log('error', error);
        res.status(500).json({ message: error.message, success: false });
    }
});
const registerEmpWithFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        // check if file is uploaded
        if (req.file === undefined) {
            return res.status(400).send("Please upload a exel file!");
        }
        else {
            // read exel file with only file whithout saving it
            const workbook = xlsx_1.default.readFile(req.file.path);
            const sheet_name_list = workbook.SheetNames;
            const xlData = xlsx_1.default.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
            console.log('data', xlData);
            xlData.map((data, index) => __awaiter(void 0, void 0, void 0, function* () {
                if (!data.id || !data.name || !data.email || !data.phone || !data.role)
                    return res.status(403).json({ message: 'All fields are required', success: false });
                // check the file format is valid or not
                if (!data.id) {
                    return res.status(403).json({ message: 'Incorrect Template', success: false });
                }
                try {
                    // conver the role into number
                    const converRole = data.role.split(";").map((item) => Number(item));
                    // generate password
                    const password = (0, regsiter_controller_1.generatePassword)();
                    const newEmp = new emp_Model_1.default({
                        id: data.id,
                        name: data.name,
                        email: data.email,
                        phone: data.phone,
                        role: converRole,
                        password: password
                    });
                    // save the file into db
                    const isDone = yield newEmp.save();
                    if (!isDone)
                        return res.status(500).json({ message: 'Something went wrong', success: false });
                    return res.status(200).json({
                        message: xlData.length + ' records are saved', data: {
                            id: data.id,
                            password: password
                        }, success: true
                    });
                }
                catch (error) {
                    console.log(error);
                    // check the error code for duplicate email or phone number
                    if (error.code === 11000)
                        return res.status(403).json({ message: 'ID or Phone number is already exists of ' + data.id, success: false });
                    return res.status(500).json({ message: error.message, success: false });
                }
            }));
            // delete the file after saving it into db
            const path = (_b = req === null || req === void 0 ? void 0 : req.file) === null || _b === void 0 ? void 0 : _b.path;
            fs_1.default.unlinkSync(path);
        }
    }
    catch (error) {
        console.log('error', error);
        res.status(500).json({ message: error.message, success: false });
    }
});
exports.default = { registerSchoolWithFile, registerEmpWithFile };
