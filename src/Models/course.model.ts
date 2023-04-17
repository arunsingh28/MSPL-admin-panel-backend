import mongoose from 'mongoose'

interface Icourse extends mongoose.Document {
    courseTitle: string
    courseDescription: string
    thumbnail: {
        location: string,
        key: string
    },
    category: {
        type: string
    }
    creator: string
    moduleNames: [{
        id: 1,
        moduleName: '',
    }],
    lessons: [{
        lessonName: string,
        pdf: {
            location: string,
            key: string,
        }
        // lessonDescription: string,
        lessonContent: string,
        // lessonVideo: string,
        // lessonQuiz: string,
        // lessonQuizAnswers: [{
        //     answer: string,
        //     correct: boolean,
        // }]
    }]
}

const courseSchema = new mongoose.Schema({
    courseTitle: { type: String, required: true, unique: true },
    courseDescription: { type: String, required: true },
    thumbnail: {
        location: { type: String },
        key: { type: String },
    },
    category: {
        type: String,
    },
    creator: { type: String, required: true },
    moduleNames: {
        type: [{
            id: { type: Number },
            moduleName: { type: String }
        }],
        _id: false,
        default: [
            {
                id: 1,
                moduleName: ''
            },
        ]
    },
    lessons: {
        type: [{
            lessonName: { type: String },
            lessonContent: { type: String },
            pdf: {
                location: { type: String },
                key: { type: String },
            }
        }],
        _id: false,
        default: [
            {
                lessonName: '',
                lessonContent: '',
                pdf: {
                    location: '',
                    key: ''
                }
            },
        ]
    }

})

export default mongoose.model<Icourse>('Course', courseSchema)
