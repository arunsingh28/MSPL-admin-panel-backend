import mongoose from "mongoose";
import { academyDocument } from '../Interface/academy.interface'


const academySchema = new mongoose.Schema({
    academyName: {
        type: String,
        required: true,
    },
    academyEmail:{
        type: String,
        required: true,
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        ]
    },
    uid: {
        type: String,
        required: true,
        unique: true,
    },
    password: String,
    referalCode: String,
    sports: {
        isCricket: Boolean,
        isTennis: Boolean,
        isFootball: Boolean,
        isBadminton: Boolean,
        isBasketball: Boolean,
        other: String,
    },
    contestPerson: {
        name: String,
        number: Number,
        email: String,
    },
    address: {
        city: String,
        address: String,
    },
    links: {
        google: String,
        website: String,
        playO: String,
    },
    coches: []
})

export default mongoose.model<academyDocument>("Academy", academySchema);

