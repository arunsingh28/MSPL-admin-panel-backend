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
const school_model_1 = __importDefault(require("../Models/school.model"));
const getAllSchool = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const school = yield school_model_1.default.find();
    if (!school)
        return res.status(404).json({ message: 'No school found' });
    return res.status(200).json({ school });
});
const schoolStatCount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const schoolCount = yield school_model_1.default.countDocuments();
    return res.status(200).json({ schoolCount });
});
const schoolDelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const school = yield school_model_1.default.findByIdAndDelete(req.params.id);
    if (!school)
        return res.status(404).json({ message: 'No school found' });
    return res.status(200).json({ school });
});
const searchSchool = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // send similar school with city name from database
    if (req.body.city === '' || req.body.schoolName) {
        const school = yield school_model_1.default.find({ schoolName: { $regex: req.body.schoolName, $options: 'i' } });
        return res.status(200).json({ school });
    }
});
const schoolViewById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const school = yield school_model_1.default.findById(req.params.id);
    if (!school)
        return res.status(404).json({ message: 'No school found' });
    return res.status(200).json({ school });
});
exports.default = { getAllSchool, schoolStatCount, schoolDelete, searchSchool, schoolViewById };
