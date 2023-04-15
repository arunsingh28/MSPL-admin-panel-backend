import mongoose from 'mongoose'

interface IAthelete extends mongoose.Document {
    // introduce 
    name: string
    age: number
    preferredLanguage: string
    email: string
    phone: string
    client: string
    package: string
    sportsProfile: {
        sportName: string,
        position: string,
    }
    // ANTHROPOMETRY
    height: number
    weight: number
    BMI: number

    // MEDICAL HISTORY  
    familyHistory: string
    weghtGain: string
    weightLoss: string
    diabetes: 'Pre DM' | 'Type 1' | 'Type 2' | 'None'
    heartHealth: 'Hypertension' | 'Hypotension' | 'None'
    Thyroid: 'Hyper' | 'Hypo' | 'None'
    gutHealth: []
    bowelMovement: []
    gynecHealth: []
    PMSsymptoms: []
    Others: string
    medications: [
        {
            medicationName: string,
            time: string,
            reason: string
        }
    ]
    // FOOD & LIFESTYLE HABITS  
    dietPreference: 'Vegetarian' | 'Non-vegetarian' | 'Ovo-vegetarian' | 'Vegan' | 'Jain' | 'others'
    foodAllergies: string
    foodIntolerances: string
    dailyWaterIntake: number
    dailySleep: number
    outsideFoodConsumption: 'Daily' | 'Twice a week' | 'Once a week' | 'Occasionally' | 'Never'
    dailyActivity: number
    traningSchedule: [{
        day: string,
        time: string,
    }]
    other: string

    // 24HR FOOD RECALL
    foodRecall: [{
        time: string,
        food: string,
        quantity: string,
        mealType: 'Early Morning ' | 'Lunch' | 'Dinner' | 'Breakfast' | 'Mid Morning' | 'Evening Snack' | 'Bed Time'
    }]

    // FOOD FREQUENCY
    foodFrequency: [{
        foodGroup: string,
        daily: boolean,
        Frequently: boolean,
        Occasionally: boolean,
        OnceaMonth: boolean,
        OnceaWeek: boolean,
    }]

    //  SUMMARY / BRIEF :  
    summary: string
}

const AtheleteSchema = new mongoose.Schema({
    // introduce
    name: { type: String, required: true },
    age: { type: Number, required: true },
    preferredLanguage: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    client: { type: String, required: true },
    package: { type: String, required: true },
    sportsProfile: {
        sportName: { type: String, required: true },
        position: { type: String, required: true },
    },
    // ANTHROPOMETRY    
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    BMI: { type: Number, },

    familyHistory: { type: String, },
    weghtGain: { type: String, },
    weightLoss: { type: String, },
    diabetes: { type: String, },
    heartHealth: { type: String, },
    Thyroid: { type: String },
    gutHealth: { type: Array },
    bowelMovement: { type: Array },
    gynecHealth: { type: Array },
    PMSsymptoms: { type: Array },
    Others: { type: String },
    medications: [
        {
            medicationName: { type: String },
            time: { type: String },
            reason: { type: String }
        }
    ],
    // FOOD & LIFESTYLE HABITS
    dietPreference: { type: String },
    foodAllergies: { type: String },
    foodIntolerances: { type: String },
    dailyWaterIntake: { type: Number },
    dailySleep: { type: Number },
    outsideFoodConsumption: { type: String },
    dailyActivity: { type: Number },
    traningSchedule: [{
        day: { type: String },
        time: { type: String },
    }],
    other: { type: String },

    // 24HR FOOD RECALL
    foodRecall: [{
        time: { type: String },
        food: { type: String },
        quantity: { type: String },
        mealType: { type: String }
    }],
    // FOOD FREQUENCY
    foodFrequency: [{
        foodGroup: { type: String },
        daily: { type: Boolean },
        Frequently: { type: Boolean },
        Occasionally: { type: Boolean },
        OnceaMonth: { type: Boolean },
        OnceaWeek: { type: Boolean },
    }],
})

export default mongoose.model<IAthelete & mongoose.Document>('atheleteAssismentForm', AtheleteSchema)