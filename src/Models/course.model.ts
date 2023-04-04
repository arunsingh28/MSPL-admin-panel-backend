import mongoose from 'mongoose'

interface Icourse extends mongoose.Document {
    courseTitle: string
    courseDescription: string
    moduleNames: [{
        id: 1,
        moduleName: '',
    }],
    lessons: [{
        lessonName: string,
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
        }],
        _id: false,
        default: [
            {
                lessonName: '',
                lessonContent: '',
            },
        ]
    }

})

export default mongoose.model<Icourse>('Course', courseSchema)
