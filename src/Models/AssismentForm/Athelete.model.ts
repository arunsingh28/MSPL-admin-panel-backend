import mongoose from 'mongoose'



interface IAtheleteModel extends mongoose.Document {
    client: mongoose.Schema.Types.ObjectId
    INTRODUCTION: {
        Name: string
        Age: number
        PreferredLanguage: string
        Email: string
        Phone: string
        Client: string
        Package: string
        SportsProfile: {
            SportName: string
            Position: string
        }
    },
    SUMMARY: {
        Summary: string
    }
    ANTHROPOMETRY: {
        Height: string
        Weight: string
        BMI: string
    },
    MEDICAL_HISTORY: {
        FamilyHistory: string
        WeightHistory: string
        Diabetes: string
        PMS: []
        Gender: string
        HeartHealth: string
        Thyroid: string
        GutHealth: string
        BowelMovement: string
        Other: string
        OnMedications: [{
            medicationName: string,
            time: string,
            reason: string
        }],
    },
    FOOD_LIFESTYLE_HABITS: {
        DietPreference: string
        FoodAllergies: string
        FoodIntolerances: string
        DailyWaterIntake: string
        OutsideFoodConsumption: string
        DailyActivity: string
        SocialHabit: string
        SleepingHours: string
        TraningSchedule: []
        totalHours: {
            Monday: string,
            Tuesday: string,
            Wednesday: string,
            Thursday: string,
            Friday: string,
            Saturday: string,
            Sunday: string
        }
        totalHourss: {
            Monday: string,
            Tuesday: string,
            Wednesday: string,
            Thursday: string,
            Friday: string,
            Saturday: string,
            Sunday: string
        }
        Other: string
    },
    FOOD_RECALL: {
        Meals: []
        FoodFrequency: []
    },
}

const AtheleteSchema = new mongoose.Schema({
    // introduce
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    INTRODUCTION: {
        Name: {
            type: String
        },
        Age: {
            type: Number,
            default: 0
        },
        PreferredLanguage: {
            type: String
        },
        Email: {
            type: String,
            match: [
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            ]
        },
        Phone: {
            type: String,
            match: [
                /^[0-9]{10}$/,
            ]
        },
        Package: {
            type: String
        },
        SportsProfile: {
            SportName: {
                type: String,
            },
            Position: {
                type: String,
            }
        }
    },
    SUMMARY: {
        Summary: {
            type: String
        }
    },
    ANTHROPOMETRY: {
        Height: {
            type: String
        },
        Weight: {
            type: String
        },
        BMI: {

            type: String
        }
    },
    MEDICAL_HISTORY: {
        FamilyHistory: {
            type: String
        },
        WeightHistory: {
            type: String
        },
        Diabetes: {
            type: String
        },
        Gender: {
            type: String
        },
        HeartHealth: {
            type: String
        },
        Thyroid: {
            type: String
        },
        PMS: [],
        GutHealth: {
            type: String
        },
        BowelMovement: {
            type: String
        },
        Other: {
            type: String
        },
        OnMedications: [{
            medicationName: {
                type: String,
            },
            time: {
                type: String,
            },
            reason: {
                type: String,
            },
        }]
    },
    FOOD_LIFESTYLE_HABITS: {
        DietPreference: {
            type: String
        },
        FoodAllergies: {
            type: String
        },
        FoodIntolerances: {
            type: String,
        },
        DailyWaterIntake: {
            type: String,
        },
        OutsideFoodConsumption: {
            type: String,
        },
        DailyActivity: {
            type: String,
        },
        TraningSchedule: [],
        Other: {
            type: String
        },
        totalHourss: {
            Monday: { type: String, default: 0 },
            Tuesday: { type: String, default: 0 },
            Wednesday: { type: String, default: 0 },
            Thursday: { type: String, default: 0 },
            Friday: { type: String, default: 0 },
            Saturday: { type: String, default: 0 },
            Sunday: { type: String, default: 0 }
        }
    },
    FOOD_RECALL: {
        Meals: [],
        FoodFrequency: []
    },
})

export default mongoose.model<IAtheleteModel & mongoose.Document>('atheleteAssismentForm', AtheleteSchema)

