import mongoose from 'mongoose';


interface DietFrequencyInterface extends mongoose.Document {
    name: string;
    status: boolean;
}

const DietFrequencySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    status: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });


const DietFrequencyModel = mongoose.model<DietFrequencyInterface>('DietFrequency', DietFrequencySchema);

export default DietFrequencyModel;