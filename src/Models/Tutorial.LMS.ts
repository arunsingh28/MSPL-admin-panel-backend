import mongoose from 'mongoose'
import { ITutorial } from '../Interface/Tutorial.LMS'

const tutorialSchema = new mongoose.Schema({
    TutorialTitle: {
        type: String,
        required: true,
        unique: true,
    },
    TutorialDescription: {
        type: String,
        required: true,
    },
    intiater: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'emp',
    },
    moduleNumber: Number,
    module: [
        {
            moduleTitle: {
                type: String,
                // required: true,
            },
            moduleDescription: {
                type: String,
                // required: true,
            },
        }
    ],
    chapter: [
        {
            chapterTitle: {
                type: String,
                // required: true,
            },
        }
    ],
    thumbnail: {
        type: String,
        // required: true,
    },
    category: {
        type: String,
        // required: true,
    },
    isDeleted: {
        type: Boolean,
        // default: false,
    },
}, { timestamps: true })

export const Tutorial = mongoose.model<ITutorial>('Tutorial', tutorialSchema)