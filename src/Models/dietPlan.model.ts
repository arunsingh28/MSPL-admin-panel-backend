import mongoose from 'mongoose'

interface DietPlan {
    recipe: [],
    client: string,
}

const DietPlanSchema = new mongoose.Schema({
    client: {
        type: String,
        required: true
    },
    recipe: []
}, { timestamps: true })

const DietPlanModel = mongoose.model<DietPlan>('DietPlan', DietPlanSchema)
export default DietPlanModel