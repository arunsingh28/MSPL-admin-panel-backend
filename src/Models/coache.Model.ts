import mongoose from 'mongoose'

export interface ICoache extends mongoose.Document {
    name: string;
    email: string;
    phone: number;
    academy: mongoose.Schema.Types.ObjectId
    isDeleted: boolean;
    sports: {
        isCricket: boolean,
        isTennis: boolean,
        isFootball: boolean,
        isBadminton: boolean,
        isBasketball: boolean,
        other: string
    }
}

const coacheSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: [true, 'this field required'],
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        ]
    },
    phone: {
        type: Number,
        required: true,
        unique: true,
        match: [
            /^[0-9]{10}$/,
        ]
    },
    academy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Academy'
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    sports: {
        isCricket: {
            type: Boolean,
            default: false,
        },
        isTennis: {
            type: Boolean,
            default: false,
        },
        isFootball: {
            type: Boolean,
            default: false,
        },
        isBadminton: {
            type: Boolean,
            default: false,
        },
        isBasketball: {
            type: Boolean,
            default: false,
        },
        other: {
            type: String,
            default: '',
        }
    }
})

export const Coache = mongoose.model<ICoache>('Coache', coacheSchema)