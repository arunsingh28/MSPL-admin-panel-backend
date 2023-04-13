import mongoose from 'mongoose'

export interface EmpDocument extends mongoose.Document {
    password: string
    name: string
    refreshToken: string
    otp: Number
    oldOtp: Number
    email: String
    referral_code: String
    accessToken: String
    created_date: Date
    status: Boolean
    phone: number
    role: number[]
    empId: String
    tutorialTimeline: {
        initTutorial: Boolean,
        createModule: Boolean,
        nameModule: Boolean,
        designModule: Boolean,
        writeModule: Boolean,
    },
    updated_date: Date,
    isMute: {
        loginNotification: Boolean
        logoutNotification: Boolean
        deleteNotification: Boolean
    },
    myClient: [type: mongoose.Schema.Types.ObjectId, ref: 'User'],
    profile: {
        bio: String,
        profileImage: {
            location: String
            key: String
        }
        education: String
        qualification: String
        experience: number
        language: []
        specialisation: []
    }
    timestamps: Date
}

