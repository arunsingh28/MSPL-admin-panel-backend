import mongoose from 'mongoose'

export interface RegisterDocument extends mongoose.Document {
    packageName: string
    packagePrice: number
    packageDescription: string
    packageDuration: number
    packageDurationUnit: string
    packageDesc: string
    packagePoint: []
    packageChild: []
}

const packageSchema = new mongoose.Schema({
    packageName: {
        type: String,
        required: true,
        unique: true,
    },
    packagePrice: {
        type: Number,
        required: true,
    },
    packageDuration: {
        type: Number,
        required: true,
    },
    packageDurationUnit: {
        type: String,
        required: true,
    },
    packageDescription: {
        type: String,
        required: true,
    },
    packagePoint: [],
    packageChild: []
})

export default mongoose.model<RegisterDocument>('package', packageSchema)