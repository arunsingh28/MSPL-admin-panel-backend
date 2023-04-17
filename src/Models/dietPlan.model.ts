import mongoose from 'mongoose'

interface DietPlan {
    mealPlan: [
        weekPlan: []
    ],
    client: string,
}

const DietPlanSchema = new mongoose.Schema({
    client: {
        type: String,
        required: true
    },
    mealPlan: [

        { weekPlan: [] }

    ]
}, { timestamps: true })

const DietPlanModel = mongoose.model<DietPlan>('DietPlan', DietPlanSchema)
export default DietPlanModel