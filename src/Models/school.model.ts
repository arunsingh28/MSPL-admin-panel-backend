import mongoose from 'mongoose'
import { schoolInterface } from '../Interface/School.interface'

const schoolSchema = new mongoose.Schema({
    schoolName: {
        type: String,
        required: true
    },
    schoolAddress: {
        schoolArea: {
            type: String,
            required: true
        },
        schoolCity: {
            type: String,
            required: true
        },
        pinCode: {
            type: Number,
            required: true
        }
    },
    contestPerson: {
        contactName: {
            type: String,
            required: true
        },
        contactPhone: {
            type: Number,
            required: true,
            unique: true
        },
        contactEmail: {
            type: String,
            required: true,
            unique: true,
            match: [
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            ]
        }
    },
    sports: {
        isCricket: {
            type: Boolean,
            default: false
        },
        isTennis: {
            type: Boolean,
            default: false
        },
        isFootball: {
            type: Boolean,
            default: false
        },
        isBadminton: {
            type: Boolean,
            default: false
        },
        isBasketball: {
            type: Boolean,
            default: false
        },
        other: {
            type: String,
            default: 'NA'
        }
    }

}, { timestamps: true })


const schoolModel = mongoose.model<schoolInterface>('school', schoolSchema)

export default schoolModel