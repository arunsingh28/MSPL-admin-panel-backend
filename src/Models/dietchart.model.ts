import mongoose from 'mongoose'

export interface DietChartDocument extends mongoose.Document {
    userId: mongoose.Schema.Types.ObjectId,
    dietChart: {
        mealFrequencyName: []
        waterIntake: Number
    },
}

const dietChartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    dietChart: {
        mealFrequencyName: [],
        waterIntake: Number
    },
}, { timestamps: true })

export default mongoose.model<DietChartDocument>('DietChart', dietChartSchema)