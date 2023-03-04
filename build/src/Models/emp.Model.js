"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const empSchema = new mongoose_1.default.Schema({
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
        // validate: {
        //     validator: (val: number) => {
        //         let condition = (val == 1111111111 || 2222222222 || 333333333 || 444444444) ? false : true
        //         return condition
        //     },
        //     message: (props: any) => `${props.value} is not valid number`
        // },
        // set: setCountryCode
    },
    // dob: {
    //     type: String,
    //     required: true,
    // },
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
    status: {
        type: Boolean,
        default: true
    },
    profile_image: {
        location: String,
        key: String,
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
    // gender:{
    //     type: String,
    //     default: 'Male'
    // },
    role: [],
}, {
    timestamps: true
});
empSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        // set randmon referral code
        // place default genrated value to otp
        user.otp = Math.floor(100000 + Math.random() * 900000);
        user.oldOtp = Math.floor(100000 + Math.random() * 900000);
        // encrypt the password
        // user.password = await bcrypt.hash(user.password, bcrypt.genSaltSync(10))
        return next();
    });
});
// perform on every query 
empSchema.post("init", function () {
    return __awaiter(this, void 0, void 0, function* () {
        // update the time of updated_date
        const user = this;
        // (<any>user).updated_date = Date.now()
        // console.log('UPDATED USER', user)
    });
});
const registerModel = mongoose_1.default.model('emp', empSchema);
exports.default = registerModel;
