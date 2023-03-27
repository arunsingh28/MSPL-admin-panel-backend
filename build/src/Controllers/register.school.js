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
const registerForSchool = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { schoolName, schoolArea, schoolCity, pinCode, contactName, contactPhone, contactEmail, cricket: isCricket, tennis: isTennis, isFootball, badminton: isBadminton, basketball: isBasketball, otherSport: other } = req.body;
    // value validation
    if (!schoolName || !schoolArea || !schoolCity || !pinCode || !contactName || !contactPhone || !contactEmail)
        return res.status(403).json({ message: 'All fields are required', sucess: false });
    try {
        const newSchool = new school_model_1.default({
            schoolName,
            schoolAddress: { schoolArea, schoolCity, pinCode },
            contestPerson: { contactName, contactPhone, contactEmail },
            sports: { isCricket, isTennis, isFootball, isBadminton, isBasketball, other }
        });
        // save the data into db
        const isDone = yield newSchool.save();
        if (!isDone)
            return res.status(500).json({ message: 'Something went wrong', sucess: false });
        return res.status(200).json({ message: `${schoolName} is Created Succssfully.`, sucess: true });
    }
    catch (error) {
        console.log(error);
        // check the error code for duplicate email or phone number
        if (error.code === 11000)
            return res.status(403).json({ message: 'Email or Phone number is already exists.', sucess: false });
        return res.status(500).json({ message: error.message, sucess: false });
    }
});
exports.default = { registerForSchool };
