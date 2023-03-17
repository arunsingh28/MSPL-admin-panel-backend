import mongoose from 'mongoose'
import { ingridienentsDocument } from '../Interface/ingridienents.interface'

const ingridienentsSchema = new mongoose.Schema({
    name: {
        type: String,
        unique : true,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    unit: {
        type: String,
        required: true,
    },
    calories: {
        type: Number,
        required: true,
    },
    fat: {
        type: Number,
        required: true,
    },
    carbs: {
        type: Number,
        required: true,
    },
    protein: {
        type: Number,
        required: true,
    },
})

export const ingridienentsModel = mongoose.model<ingridienentsDocument>('ingridienents', ingridienentsSchema)