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
    SUMMARY: string
    ANTHROPOMETRY: {
        Height: string
        Weight: string
        BMI: string
    },
    MEDICAL_HISTORY: {
        FamilyHistory: string
        WeightHistory: string
        Diabetes: string
        PMS: string
        HeartHealth: string
        Thyroid: string
        GutHealth: string
        BowelMovement: string
        Other: string
        OnMedications: [{
            medicationName: string,
            time: string,
            reason: string
        }]
    },
    FOOD_LIFESTYLE_HABITS: {
        DietPreference: string
        FoodAllergies: string
        FoodIntolerances: string
        DailyWaterIntake: string
        OutsideFoodConsumption: string
        DailyActivity: string
        TraningSchedule: [{
            day: string,
            time: string,
            caloris: string
        }]
        Other: string
    },
    FOOD_RECALL: {
        FoodRecall: [{
            meal: string,
            time: string,
            menu: string
            quantity: string,
        }],
        FoodFrequency: [{
            foodGroup: string,
            daily: boolean,
            Frequently: boolean,
            Occasionally: boolean,
            OnceaMonth: boolean,
            OnceaWeek: boolean,
        }]
    }
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
        type: String
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

        HeartHealth: {
            type: String
        },

        Thyroid: {
            type: String
        },

        GutHealth: {
            type: String
        },
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
        TraningSchedule: [{
            day: {

                type: String,
            },
            time: {
                type: String,
            },
            caloris: {
                type: String,
            }
        }],
        Other: {
            type: String
        }
    },

    FOOD_RECALL: {
        FoodRecall: [{
            meal: {
                type: String,
            },
            time: {
                type: String,
            },
            menu: {
                type: String,
            },
            quantity: {
                type: String,
            },
        }],
        FoodFrequency: [{
            foodGroup: {
                type: String,
            },
            daily: {
                type: Boolean,
            },
            Frequently: {
                type: Boolean,
            },

            Occasionally: {
                type: Boolean,
            },
            OnceaMonth: {
                type: Boolean,
            },
            OnceaWeek: {
                type: Boolean,
            },
        }]
    },


})

export default mongoose.model<IAtheleteModel & mongoose.Document>('atheleteAssismentForm', AtheleteSchema)

