import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
    name: string;
    email: string;
    academy: mongoose.Schema.Types.ObjectId;
    phone: number;
    dob: Date;
    referal_code: string;
    planType: string;
    gender: string;
    profileTimeline: string;
    waterIntake: number;
    measurement: {
        height: number;
        weight: number;
    };
    profileImage: {
        location: string;
        key: string;
    },
    nutritionist: mongoose.Schema.Types.ObjectId;
    BMI: number;
    BMR: number;
    language: string
    isPaid: boolean;
    sportList: string[]
    isVerified: boolean;
    isBlocked: boolean;
    isDeleted: boolean;
    otp: number
    oldOtp: number
}
