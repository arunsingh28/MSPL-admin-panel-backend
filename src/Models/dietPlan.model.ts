import mongoose from 'mongoose'

interface DietPlan {
    protein: number,
    carbs: number,
    fat: number,
    calories: number,
    client: mongoose.Schema.Types.ObjectId
    recipie: [type: mongoose.Schema.Types.ObjectId, ref: 'Recipe']
}

const DietPlanSchema = new mongoose.Schema({
    protein: Number,
    carbs: Number,
    fat: Number,
    calories: Number,
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    recipie: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe'
    }]
}, { timestamps: true })

const DietPlanModel = mongoose.model<DietPlan>('DietPlan', DietPlanSchema)