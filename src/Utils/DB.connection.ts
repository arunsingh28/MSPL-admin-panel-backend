import mongoose from "mongoose";
import env from '../../config/env'

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