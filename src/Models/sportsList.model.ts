import mongoose from 'mongoose'

export interface SportsListDocument extends mongoose.Document {
    name: string
    description: string
    image: {
        location: string
        key: string
    }
    status: boolean
    timestamps: Date
}

const sportsListSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        location: {
            type: String,
            required: true
        },
        key: {
            type: String,
            required: true
        }
    },
    status: {
        type: Boolean,
        required: true,
        default: true
    },
    timestamps: {
        type: Date,
        default: Date.now,
        required: true
    }
})

export const sportsListDB = mongoose.model<SportsListDocument>('SportsList', sportsListSchema)

