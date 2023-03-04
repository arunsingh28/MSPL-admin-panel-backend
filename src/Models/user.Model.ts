import mongoose from "mongoose";
import { IUser } from "../Interface/user.interface";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
        unique: true,
    },
    sex: {
        type: String,
        required: true,
    },
    password: String,
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
    user.password = await bcrypt.hash(user.password, bcrypt.genSaltSync(10))
    return next()
})

const userModel = mongoose.model<IUser>("User", userSchema);


export default userModel;