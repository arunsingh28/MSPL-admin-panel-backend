import mongoose from 'mongoose'

interface RecipeInterface extends mongoose.Document {
    name: string;
    category: string[];
    ingredients: [];
    // instructions: string;
    preparationTime: number;
    image: {
        location: string;
        key: string;
    }
    status: boolean;
    sourceLink: string;
    nutritionName: string;
    tags: string[];
}

const RecipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    preparationTime:{
        type: Number,
        required: true,
    },
    ingredients: {
        type: Array,
        required: true,
    },
    // instructions: {
    //     type: String,
    //     required: true,
    // },
    image: {
        location: {
            type: String,
            required: true,
        },
        key: {
            type: String,
            required: true,
        }
    },
    status: {
        type: Boolean,
        default: true
    },
    sourceLink: {
        type: String,
        required: true,
    },
    nutritionName: {
        type: String,
        required: true,
    },
    tags: {
        type: Array,
        required: true,
    }

}, { timestamps: true })

const RecipeModel = mongoose.model<RecipeInterface>('Recipe', RecipeSchema)

export default RecipeModel