import mongoose from "mongoose";
import env from '../../config/env'
import calorissMaster from '../Models/caloriesMaster.model'

// run the clories master model only once
export const runCaloriesMaster = async () => {
    const caloriesMaster = await calorissMaster.find()
    if (caloriesMaster.length === 0) {
        calorissMaster.create({}).then((data) => {
            console.log(data)
        }).catch((err) => {
            console.log(err)
        })
    } else return
}

runCaloriesMaster()

export const connectDB = async () => {
    await mongoose.connect(env._databse_url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
        useCreateIndex: true
    })
        .then(() => {
            console.log(`****** Connection established to Database ********`);
        })
        .catch((err) => {
            console.log(
                `\n****** Connection not established to Database ********\n\n`,
                err
            );
        })
}