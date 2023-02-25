import mongoose from "mongoose";
import {academyDocument} from '../Interface/academy.interface'


const academySchema = new mongoose.Schema({
    academyName: {
        type: String,
        required: true,
    },
    ownerName: {
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
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    logo: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    website: {
        type: String,
        required: true,
    },
    coaches: [
        {
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
            }
        }
    ]
})

export default mongoose.model<academyDocument>("Academy", academySchema);

