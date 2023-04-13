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
    thumbnail: {
        location: String,
        key: String,
    },
    intiater: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'emp',
    },
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
    category: {
        type: String,
    },
    isDeleted: {
        type: Boolean,
    },
}, { timestamps: true })

export const Tutorial = mongoose.model<ITutorial>('Tutorial', tutorialSchema)