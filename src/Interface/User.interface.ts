import mongoose from 'mongoose'

export interface RegisterDocument extends mongoose.Document {
    // firstName: String
    // lastName: String
    // phone: number
    password: string
    name: string
    // dob: String
    otp: Number
    oldOtp: Number
    email: String
    // gender: String
    // address: {
    //     street: String
    //     state: String
    //     pincode: Number
    //     city: String
    // },
    referral_code: String
    accessToken: String
    created_date: Date
    status: Boolean
    role: number
    empId: String
    updated_date: Date,
    isMute:{
        loginNotification: Boolean
        logoutNotification: Boolean
        deleteNotification: Boolean
    }
    timestamps: Date
}
