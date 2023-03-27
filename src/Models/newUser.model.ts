
import mongoose, { HookNextFunction } from 'mongoose'

interface INewUser extends mongoose.Document {
    phone: number
    otp: number
    oldOtp: number
}


const newUser = new mongoose.Schema({
    phone: {
        type: Number,
        required: true,
        unique: true,
    },
    otp: Number,
    oldOtp: Number,
})


newUser.pre('save', async function (next: HookNextFunction) {
    const user = this as INewUser
    user.otp = Math.floor(100000 + Math.random() * 900000)
    user.oldOtp = Math.floor(100000 + Math.random() * 900000)
    next()
})


export default mongoose.model<INewUser>('newUser', newUser)