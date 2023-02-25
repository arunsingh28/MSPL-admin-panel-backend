import mongoose from "mongoose";
import { RegisterDocument } from '../Interface/User.interface'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'this field required'],
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        ],
        // validate: {             
        //     validator: function (val: string) {
        //         let condition = (val == 'test@gmail.com' || '123@gmail.com' || 'google@gmail.com') ? false : true
        //         return condition
        //     },                  
        //     message: (props: any) => `${props.value} is not valid email`
        // }                        
    },
    empId:{
        type: String,
        required: true,
    },
    otp: {
        type: Number,
    },
    oldOtp: {
        type: Number
    },
    // firstName: {
    //     type: String,
    //     required: true,
    // },
    // lastName: {
    //     type: String,
    //     required: true,
    // },
    name:{
        type: String,
        required: true
    },
    // address: {
    //     type: {
    //         street: String,
    //         city: String,
    //         state: String,
    //         // pincode: Number
    //     },
    //     required: true,
    // },
    password:{
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true,
        // validate: {
        //     validator: (val: number) => {
        //         let condition = (val == 1111111111 || 2222222222 || 333333333 || 444444444) ? false : true
        //         return condition
        //     },
        //     message: (props: any) => `${props.value} is not valid number`
        // },
        // set: setCountryCode
    },
    // dob: {
    //     type: String,
    //     required: true,
    // },
    referral_code: {
        type: String,
    },
    isMute:{
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
    status:{
        type: Boolean,
        default: true
    },
    profile_image:{
        location: String,
        key: String,
    },
    // gender:{
    //     type: String,
    //     default: 'Male'
    // },
    role: [],
}, {
    timestamps: true
})

userSchema.pre('save', async function (next: mongoose.HookNextFunction) {
    const user = this as RegisterDocument
    // set randmon referral code
    // place default genrated value to otp
    user.otp = Math.floor(100000 + Math.random() * 900000)
    user.oldOtp = Math.floor(100000 + Math.random() * 900000)
    // encrypt the password
    // user.password = await bcrypt.hash(user.password, bcrypt.genSaltSync(10))
    return next()
})

// perform on every query 
userSchema.post("init", async function () {
    // update the time of updated_date
    const user = this as RegisterDocument
    // (<any>user).updated_date = Date.now()
    // console.log('UPDATED USER', user)
})

const registerModel = mongoose.model<RegisterDocument>('emp', userSchema)

export default registerModel