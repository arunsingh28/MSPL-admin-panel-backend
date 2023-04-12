import mongoose from 'mongoose'

export interface ingridienentsDocument extends mongoose.Document {
    name: string
    quantity: number
    unit: string
    calories: number
    fat: number
    carbs: number
    protein: number
    index: number
    // cholesterol: number
    // sodium: number
    // potassium: number
    // fiber: number
    // sugar: number
    // vitaminA: number
    // vitaminC: number
    // calcium: number
    // iron: number
    // vitaminD: number
    // vitaminB6: number
    // vitaminB12: number
    // magnesium: number
    // zinc: number
    // created_date: Date
    // updated_date: Date
    // timestamps: Date
}

