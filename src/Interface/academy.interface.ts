import mongoose from 'mongoose'

export interface academyDocument extends mongoose.Document {
    academyName: string,
    academyEmail: string,
    password: string,
    referalCode: string,
    uid: string,
    sports:{
        isCricket: boolean,
        isTennis: boolean,
        isFootball: boolean,
        isBadminton: boolean,
        isBasketball: boolean,
        other: string
    },
    contestPerson: {
        name: string,
        number: number,
        email: string
    },
    address:{
        city: string,
        address: string,
    },
    links:{
        google: string,
        website: string,
        playO: string,
    },
    coches: []
}