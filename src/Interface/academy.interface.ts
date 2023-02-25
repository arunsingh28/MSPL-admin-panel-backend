import mongoose from 'mongoose'


export interface academyDocument extends mongoose.Document  {
    academyName: string,
    ownerName: string,
    email: string,
    phone: number,
    password: string,
    address: string,
    city: string,
    state: string,
    country: string,
    logo: string,
    status: string,
    createdAt: Date,
    website: string,
    coaches: [
        {
            name: string,
            email: string,
            phone: number,
            password: string,   
        }
    ]
}