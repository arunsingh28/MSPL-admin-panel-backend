import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
    name: string;
    email: string;
    phone: number;
    dob: Date;
    referal_code: string;
    planType: string;
    gender: string;
    measurement: {
        height: number;
        weight: number;
    };
    profileImage:{
        location: string;
        key: string;
    }
    language: string
    isPaid: boolean;
    sportList: string[]
    isVerified: boolean;
    isBlocked: boolean;
    isDeleted: boolean;
    otp: number
    oldOtp: number
}
