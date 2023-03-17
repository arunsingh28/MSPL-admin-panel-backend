import mongoose from 'mongoose';

interface IRecipeCategory extends mongoose.Document {
    name: string;
}

const recipeCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
}, { timestamps: true });

const recipeCategoryModel = mongoose.model<IRecipeCategory>('recipeCategory', recipeCategorySchema);

export default recipeCategoryModel;