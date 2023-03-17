"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tutorial_LMS_1 = __importDefault(require("../Controllers/tutorial.LMS"));
const router = express_1.default.Router();
router.route('/get-info').get(tutorial_LMS_1.default.getTutorialInfo);
router.route('/init').post(tutorial_LMS_1.default.initTutorial);
router.route('/init-module').post(tutorial_LMS_1.default.initModule);
router.route('/init-module-name').post(tutorial_LMS_1.default.initModuleName);
exports.default = router;
