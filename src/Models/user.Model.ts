import mongoose from "mongoose";
import { IUser } from "../Interface/User.interface";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        // required: true,
    },
    email: {
        type: String,
        default: null
        // required: true,
    },
    profileTimeline: {
        type: String,
    },
    phone: {
        type: Number,
        required: true,
        unique: true,
    },
    BMI: {
        type: Number,
        default: 0
    },
    BMR: {
        type: Number,
        default: 0
    },
    gender: {
        type: String,
        // required: true,
    },
    profileImage: {
        location: {
            type: String,
            default: null,
        },
        key: {
            type: String,
            default: null,
        },
    },
    nutritionist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'emp',
        default: null
    },
    nutritionData: {
        dietStatus: {
            type: Boolean,
            default: false
        },
        lastAssisted: {
            type: Date,
            default: null
        },
        nextAssisted: {
            type: Date,
            default: null
        },
        dietPlan: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'package',
            default: null
        },
        dietPlanName: {
            type: String,
            default: null
        },
        weekReport: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'weekReport',
            default: null
        },
    },
    academy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Academy',
        default: null
    },
    language: {
        type: String,
        default: "en"
    },
    waterIntake: {
        type: Number,
        default: 0
    },
    referal_code: String,
    dob: Date,
    measurement: {
        height: Number,
        weight: Number,
    },
    // bca: mongoose.Schema.Types.ObjectId,
    isPaid: {
        type: Boolean,
        default: false,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    planType: String,
    otp: Number,
    oldOtp: Number,
}, { timestamps: true })


// save hook
userSchema.pre('save', async function (next) {
    const user = this as IUser
    // set randmon referral code
    user.referal_code = Math.random().toString(36).substr(5)
    // place default genrated value to otp
    user.otp = Math.floor(100000 + Math.random() * 900000)
    user.oldOtp = Math.floor(100000 + Math.random() * 900000)
    // encrypt the password
    // user.password = await bcrypt.hash(user.password, bcrypt.genSaltSync(10))
    return next()
})

const userModel = mongoose.model<IUser>("User", userSchema);


export default userModel;