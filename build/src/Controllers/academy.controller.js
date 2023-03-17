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
const bcrypt_1 = __importDefault(require("bcrypt"));
const academy_Model_1 = __importDefault(require("../Models/academy.Model"));
const coache_Model_1 = require("../Models/coache.Model");
const registerAcademy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { academyEmail, academyName, cricket, football, badminton, baskitball, tennis, otherSport, address, city, contactNumber, contactName, contactEmail, website, googleLink, playoLink } = req.body;
    if (!academyEmail || !academyName || !address || !city || !contactNumber || !contactName || !contactEmail) {
        return res.status(400).json({ message: "All fields are required", success: false });
    }
    try {
        // genrate random 6 char password
        const password = Math.random().toString(36).slice(-6);
        const encryptPassword = yield bcrypt_1.default.hash(password, 10);
        // create uid for academy from academy name
        const split = academyName.split(' ');
        const f = split.map((e) => e.charAt(0));
        const uid = f.join().replaceAll(',', '') + Math.random().toString(36).slice(-3);
        let website, googleLink, playoLink;
        if (req.body.website === '') {
            website = null;
        }
        if (req.body.googleLink === '') {
            googleLink = null;
        }
        if (req.body.playoLink === '') {
            playoLink = null;
        }
        const academy = yield academy_Model_1.default.create({
            academyName,
            academyEmail,
            uid,
            sports: {
                isCricket: cricket,
                isTennis: tennis,
                isFootball: football,
                isBadminton: badminton,
                isBasketball: baskitball,
                other: otherSport
            },
            contestPerson: {
                name: contactName,
                number: parseInt(contactNumber),
                email: contactEmail
            },
            address: {
                address,
                city
            },
            links: {
                website,
                google: googleLink,
                playO: playoLink,
            },
            referalCode: Math.random().toString(36).slice(-6),
            password: encryptPassword
        });
        return res.status(201).json({ message: "Academy Registered Successfully", academy, success: true });
    }
    catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
});
const createCoach = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, phone, academy, sports } = req.body;
    if (!name || !email || !phone || !academy || !sports) {
        return res.status(400).json({ message: "All fields are required", success: false });
    }
    try {
        const coach = yield coache_Model_1.Coache.create({
            name,
            email,
            phone,
            academy,
            sports
        });
        return res.status(201).json({ message: "Coach Created Successfully", coach, success: true });
    }
    catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
});
exports.default = { registerAcademy, createCoach };
