import mongoose from "mongoose";
import { EmpDocument } from '../Interface/emp.interface'


const empSchema = new mongoose.Schema({
    profile: {
        profileImage: {
            location: String,
            key: String
        },
        bio: String,
        experience: Number,
        language: [],
        specialisation: [],
        education: String,
    },
    email: {
        type: String,
        required: [true, 'this field required'],
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        ],
        // validate: {             
        //     validator: function (val: string) {
        //         let condition = (val == 'test@gmail.com' || '123@gmail.com' || 'google@gmail.com') ? false : true
        //         return condition
        //     },                  
        //     message: (props: any) => `${props.value} is not valid email`
        // }                        
    },

    empId: {
        type: String,
        required: true,
    },
    otp: {
        type: Number,
    },
    oldOtp: {
        type: Number
    },
    // firstName: {
    //     type: String,
    //     required: true,
    // },
    // lastName: {
    //     type: String,
    //     required: true,
    // },
    name: {
        type: String,
        required: true
    },
    // address: {
    //     type: {
    //         street: String,
    //         city: String,
    //         state: String,
    //         // pincode: Number
    //     },
    //     required: true,
    // },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true,
    },


    referral_code: {
        type: String,
    },
    isMute: {
        loginNotification: {
            type: Boolean,
            default: false
        },
        logoutNotification: {
            type: Boolean,
            default: false
        },
        deleteNotification: {
            type: Boolean,
            default: true
        }
    },
    created_date: {
        type: Date,
        default: Date.now()
    },
    updated_date: {
        type: Date,
        default: Date.now()
    },
    lastLogin: {
        type: Date,
    },
    status: {
        type: Boolean,
        default: true
    },
    refreshToken: {
        type: String,
    },
    tutorialTimeline: {
        initTutorial: {
            type: Boolean,
            default: true
        },
        createModule: {
            type: Boolean,
            default: false
        },
        nameModule: {
            type: Boolean,
            default: false
        },
        designModule: {
            type: Boolean,
            default: false
        },
        writeModule: {
            type: Boolean,
            default: false
        },
    },
    role: [],
}, {
    timestamps: true
})

empSchema.pre('save', async function (next: mongoose.HookNextFunction) {
    const user = this as EmpDocument
    // set randmon referral code
    // place default genrated value to otp
    user.otp = Math.floor(100000 + Math.random() * 900000)
    user.oldOtp = Math.floor(100000 + Math.random() * 900000)
    // encrypt the password
    // user.password = await bcrypt.hash(user.password, bcrypt.genSaltSync(10))
    return next()
})

// perform on every query 
empSchema.post("init", async function () {
    // update the time of updated_date
    const user = this as EmpDocument
    // (<any>user).updated_date = Date.now()
    // console.log('UPDATED USER', user)
})

const registerModel = mongoose.model<EmpDocument>('emp', empSchema)

export default registerModel