import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
    name: string;
    email: string;
    phone: Number;
    password: string;
    dob: Date;
    referal_code: string;
    planType: string;
    sex: string;
    measurement: {
        height: number;
        weight: number;
    };
    // bca: mongoose.Schema.Types.ObjectId;
    isPaid: boolean;
    isVerified: boolean;
    isBlocked: boolean;
    isDeleted: boolean;
    otp: Number
    oldOtp: Number
}