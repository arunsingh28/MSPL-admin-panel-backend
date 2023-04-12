import mongoose from "mongoose";
import { EmpDocument } from '../Interface/emp.interface'


const empSchema = new mongoose.Schema({
    profile: {
        profileImage: {
            location: String,
            key: String
        },
        bio: String,
        experience: Number,
        language: [],
        specialisation: [],
        education: String,
    },
    myClient: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: null
        }
    ],
    email: {
        type: String,
        required: true,
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        ]
    },
    empId: {
        type: String,
        required: true,
    },
    otp: {
        type: Number,
    },
    oldOtp: {
        type: Number
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true,
    },
    isMute: {
        loginNotification: {
            type: Boolean,
            default: false
        },
        logoutNotification: {
            type: Boolean,
            default: false
        },
        deleteNotification: {
            type: Boolean,
            default: true
        }
    },
    created_date: {
        type: Date,
        default: Date.now()
    },
    updated_date: {
        type: Date,
        default: Date.now()
    },
    lastLogin: {
        type: Date,
    },
    status: {
        type: Boolean,
        default: true
    },
    refreshToken: {
        type: String,
    },
    tutorialTimeline: {
        initTutorial: {
            type: Boolean,
            default: true
        },
        createModule: {
            type: Boolean,
            default: false
        },
        nameModule: {
            type: Boolean,
            default: false
        },
        designModule: {
            type: Boolean,
            default: false
        },
        writeModule: {
            type: Boolean,
            default: false
        },
    },
    role: [],
}, {
    timestamps: true
})

empSchema.pre('save', async function (next: mongoose.HookNextFunction) {
    const user = this as EmpDocument
    // set randmon referral code
    // place default genrated value to otp
    user.otp = Math.floor(100000 + Math.random() * 900000)
    user.oldOtp = Math.floor(100000 + Math.random() * 900000)
    // encrypt the password
    // user.password = await bcrypt.hash(user.password, bcrypt.genSaltSync(10))
    return next()
})

// perform on every query 
empSchema.post("init", async function () {
    // update the time of updated_date
    const user = this as EmpDocument
    // (<any>user).updated_date = Date.now()
    // console.log('UPDATED USER', user)
})

const registerModel = mongoose.model<EmpDocument>('emp', empSchema)

export default registerModel