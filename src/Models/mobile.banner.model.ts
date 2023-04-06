import mongoose from 'mongoose'

interface ImobileBanner extends mongoose.Document {
    bannerImage: {
        location: string
        key: string
    }
    bannerLink: string
    bannerkey: string
}


const mobileBannerSchema = new mongoose.Schema({
    bannerImage: {
        type: {
            location: { type: String },
            key: { type: String }
        },
    },
    bannerkey: { type: String, default: null, unique: true }
})

export default mongoose.model<ImobileBanner>('MobileBanner', mobileBannerSchema)