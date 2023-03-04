import mongoose from 'mongoose'
import userModel from './emp.Model'


const loginScreen = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: userModel
    },
    token:{
        type: String,
    },
    isLoggedin:{
        type: Boolean,
        default: false,
        require:true
    },
    from:{
        type: String
    },
    to:{
        type: String
    },
    updatedAt:{
        type: Date,
        default: Date.now
    },
    firstLogin:{
        type: Date,
        default: Date.now
    }
})


const loginScreenSchema = mongoose.model('isLogedin', loginScreen)

export default loginScreenSchema