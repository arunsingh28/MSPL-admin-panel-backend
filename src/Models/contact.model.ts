import mongoose from 'mongoose'

interface contactDocument extends mongoose.Document {
    subject: string
    desc: string
}

const contactSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
}, { timestamps: true })


export const contactModel = mongoose.model<contactDocument>('contact', contactSchema)