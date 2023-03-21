"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const Recipies_controller_1 = __importDefault(require("../Controllers/Nutrition/Recipies.controller"));
const router = express_1.default.Router();
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname + "../../../" + "Nutrition/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-bulk-${file.originalname}`);
    },
});
const upload = (0, multer_1.default)({ storage });
router.route('/save-recipie').post(upload.single('file'), Recipies_controller_1.default.saveNewRecipie);
exports.default = router;
