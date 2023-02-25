import mongoose from 'mongoose'


export interface schoolInterface extends mongoose.Document  {
    schoolName: string,
    schoolAddress: {
        schoolArea: string,
        schoolCity: string,
        pinCode: number,
    }
    contestPerson: {
        name: string,
        number: number,
        email: string
    },
    sports:{
        isCricket: boolean,
        isTennis: boolean,
        isFootball: boolean,
        isBadminton: boolean,
        isBasketball: boolean,
        other: string
    }

}