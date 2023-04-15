import mongoose from 'mongoose'

interface AddMeal extends mongoose.Document {
    recipieId: string
    recipe: mongoose.Schema.Types.ObjectId[]
    date: Date
    time: string
    calories: number
}

const addMealSchema = new mongoose.Schema({
    recipieId: {
        type: String,
        required: true
    },
    recipe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    calories: {
        type: Number,
        required: true
    }
}, { timestamps: true })

const AddMeal = mongoose.model<AddMeal>('AddMeal', addMealSchema)
export default AddMeal