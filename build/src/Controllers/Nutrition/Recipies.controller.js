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
const Recipies_model_1 = __importDefault(require("../../Models/Recipies.model"));
// form.append('name', recipeDate.name)
// form.append('ingredients', JSON.stringify(recipeDate.ingredients))
// form.append('tags', JSON.stringify(recipeDate.tags))
// form.append('preparationTime', JSON.stringify(recipeDate.preparationTime))
// form.append('status', JSON.stringify(recipeDate.status))
// form.append('sourceLink', recipeDate.sourceLink)
// form.append('nutritionName', recipeDate.nutritionName)
// form.append('file', recipeDate.image)
const saveNewRecipie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // parse the data
    const data = JSON.parse(req.body.data);
    // create object
    const recipe = {
        name: req.body.name,
        ingredients: data.ingredients,
        tags: data.tags,
        preparationTime: req.body.preparationTime,
        status: req.body.status,
        sourceLink: req.body.sourceLink,
        nutritionName: req.body.nutritionName,
        image: {
            location: 'location',
            key: 'key'
        }
    };
    try {
        yield Recipies_model_1.default.create(recipe);
        return res.status(201).json({ success: true, message: 'Recipi Save' });
    }
    catch (err) {
        return res.status(200).json({ message: err.message });
    }
});
const getRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recipe = yield Recipies_model_1.default.find({});
        return res.status(200).json({ success: true, recipe });
    }
    catch (err) {
        return res.status(200).json({ message: err.message });
    }
});
exports.default = { saveNewRecipie, getRecipe };
