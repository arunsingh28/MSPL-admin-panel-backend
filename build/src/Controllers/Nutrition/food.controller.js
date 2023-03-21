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
const ingridienents_Model_1 = require("../../Models/ingridienents.Model");
const recipiCategory_Model_1 = __importDefault(require("../../Models/recipiCategory.Model"));
const DietFrequency_Model_1 = __importDefault(require("../../Models/DietFrequency.Model"));
const xlsx_1 = __importDefault(require("xlsx"));
const fs_1 = __importDefault(require("fs"));
const addIngridientWithFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // save the ingridient to the database from file
    var _a;
    if (((_a = req.file) === null || _a === void 0 ? void 0 : _a.originalname.split('.').pop()) !== 'xlsx') {
        // remove the file from server
        fs_1.default.unlinkSync(req.file.path);
        return res.status(400).json({ message: 'Please select file with xlsx format' });
    }
    if (req.file === undefined) {
        // remove the file from server
        fs_1.default.unlinkSync(req.file.path);
        return res.status(400).json({ message: 'Please select file' });
    }
    try {
        const workbook = xlsx_1.default.readFile(req.file.path);
        const sheet_name_list = workbook.SheetNames;
        const xlData = xlsx_1.default.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
        if (xlData[0].name === undefined || xlData[0].unit === undefined || xlData[0].quantity === undefined || xlData[0].calories === undefined || xlData[0].protien === undefined || xlData[0].fat === undefined || xlData[0].carb === undefined) {
            fs_1.default.unlinkSync(req.file.path);
            return res.status(400).json({ message: 'Require filed are missing use downloaded template', success: false });
        }
        let i = 0;
        let count = 0;
        while (i < xlData.length) {
            count++;
            const isInsert = yield ingridienents_Model_1.ingridienentsModel.create({
                name: xlData[i].name,
                unit: xlData[i].unit,
                quantity: xlData[i].quantity,
                calories: xlData[i].calories,
                protein: xlData[i].protien,
                fat: xlData[i].fat,
                carbs: xlData[i].carb,
            });
            i++;
        }
        fs_1.default.unlinkSync(req.file.path);
        return res.status(200).json({ message: count + ' records are inserted', success: true });
    }
    catch (error) {
        // remove file from server
        fs_1.default.unlinkSync(req.file.path);
        return res.status(500).json({ message: 'Internal server error', success: false });
    }
});
const addIngridient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // save the ingridient to the database
    try {
        const isInsert = yield ingridienents_Model_1.ingridienentsModel.create({
            name: req.body.name,
            unit: req.body.unit,
            quantity: req.body.quantity,
            calories: req.body.calories,
            protein: req.body.protein,
            fat: req.body.fat,
            carbs: req.body.carbs,
        });
        return res.status(200).json({ message: req.body.name + ' is inserted', success: true });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error', success: false });
    }
});
// fetch all ingridients
const sendIngridients = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield ingridienents_Model_1.ingridienentsModel.find({});
        return res.status(200).json({ data, success: true });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error', success: false });
    }
});
const recipieCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // save the ingridient to the database
    try {
        yield recipiCategory_Model_1.default.create({
            name: req.body.name,
        });
        return res.status(200).json({ message: req.body.name + ' is added', success: true });
    }
    catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Category already exist', success: false });
        }
        return res.status(500).json({ message: 'Internal server error', success: false });
    }
});
const sendrecipieCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // save the ingridient to the database
    try {
        const data = yield recipiCategory_Model_1.default.find({});
        return res.status(200).json({ data, success: true });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error', success: false });
    }
});
const deleteRecipeCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield recipiCategory_Model_1.default.deleteOne({ _id: req.params.id });
        return res.status(200).json({ success: true, message: 'Delete successfully' });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error', success: false });
    }
});
const updateRecipeCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield recipiCategory_Model_1.default.updateOne({ _id: req.params.id }, { $set: { name: req.body.name } });
        const data = yield recipiCategory_Model_1.default.find({});
        return res.status(200).json({ success: true, data, message: 'Update successfully' });
    }
    catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Category already exist', success: false });
        }
        return res.status(500).json({ message: 'Internal server error', success: false });
    }
});
// save the diet frequency
const addDietFrequency = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // save the ingridient to the database
    try {
        yield DietFrequency_Model_1.default.create({
            name: req.body.name,
        });
        return res.status(200).json({ message: req.body.name + ' is added', success: true });
    }
    catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Diet already exist', success: false });
        }
        return res.status(500).json({ message: 'Internal server error', success: false });
    }
});
// send all the deit frequency
const sendDietFrequency = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // save the ingridient to the database
    try {
        const data = yield DietFrequency_Model_1.default.find({});
        return res.status(200).json({ data, success: true });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error', success: false });
    }
});
// delte the diet frequency
const deleteDietFrequency = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield DietFrequency_Model_1.default.deleteOne({ _id: req.params.id });
        return res.status(200).json({ success: true, message: 'Delete successfully' });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error', success: false });
    }
});
// update the diet frequency
const updateDietFrequency = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield DietFrequency_Model_1.default.updateOne({ _id: req.params.id }, { $set: { name: req.body.name } });
        const data = yield DietFrequency_Model_1.default.find({});
        return res.status(200).json({ success: true, data, message: 'Update successfully' });
    }
    catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Diet already exist', success: false });
        }
        return res.status(500).json({ message: 'Internal server error', success: false });
    }
});
exports.default = {
    addIngridientWithFile, addIngridient,
    recipieCategory, sendrecipieCategory, sendIngridients,
    deleteRecipeCategory, updateRecipeCategory, updateDietFrequency,
    addDietFrequency, sendDietFrequency, deleteDietFrequency
};
