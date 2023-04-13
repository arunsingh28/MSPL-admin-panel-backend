import mongoose from 'mongoose'

interface CaloriesMaster {
    golf: number,
    Walking: number,
    Badminton: number,
    Basketball: number,
    Pushups: number,
    Taekwondo: number,
    Racketball: number,
    Swimming: number,
    Jogging: number,
    JumpingRope: number,
    Bicycling: number,
    TableTennis: number,
    Yoga: number,
    Gateball: number,
    Squash: number,
    JapaneseFencing: number,
    Soccer: number,
    Aerobics: number,
    MountainClimbing: number,
    Boxing: number,
    Tennis: number,
}

const CaloriesMasterSchema = new mongoose.Schema({
    golf: {
        type: Number,
        default: 4
    },
    Walking: {
        type: Number,
        default: 4
    },
    Badminton: {
        type: Number,
        default: 8
    },
    Basketball: {
        type: Number,
        default: 8
    },
    Pushups: {
        type: Number,
        default: 8
    },
    Taekwondo: {
        type: Number,
        default: 10
    },
    Racketball: {
        type: Number,
        default: 10
    },
    Swimming: {
        type: Number,
        default: 10
    },
    Jogging: {
        type: Number,
        default: 12
    },
    JumpingRope: {
        type: Number,
        default: 12
    },
    Bicycling: {
        type: Number,
        default: 10
    },
    TableTennis: {
        type: Number,
        default: 8
    },
    Yoga: {
        type: Number,
        default: 4
    },
    Gateball: {
        type: Number,
        default: 4
    },
    Squash: {
        type: Number,
        default: 12
    },
    JapaneseFencing: {
        type: Number,
        default: 8
    },
    Soccer: {
        type: Number,
        default: 10
    },
    Aerobics: {
        type: Number,
        default: 10
    },
    MountainClimbing: {
        type: Number,
        default: 17
    },
    Boxing: {
        type: Number,
        default: 12
    },
    Tennis: {
        type: Number,
        default: 8
    },
}, { timestamps: true })

const CaloriesMasterModel = mongoose.model<CaloriesMaster>('CaloriesMaster', CaloriesMasterSchema)

export default CaloriesMasterModel