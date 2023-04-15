import { Request, Response } from 'express'
import bannerModel from '../../Models/mobile.banner.model'
import { uploadFile, deleteFile } from '../../services/aws.s3'

interface IBanner {
    bannerImage: {
        location: string
        key: string
    }
    bannerkey: string
    _id: string
}

const uploadBanner = async (req: Request, res: Response) => {
    let banner: any
    try {
        banner = await uploadFile(req.file, 'mobileBanner')

        console.log({ banner })
        const bannerData = new bannerModel({
            bannerImage: {
                location: banner?.location,
                key: banner?.key,
            },
            bannerkey: req.query.key
        })
        await bannerData.save()
        res.status(200).json({ success: true, message: 'Banner uploaded successfully' })
    } catch (err: any) {
        if (err.code === 11000) {
            const isDelete = await deleteFile(banner.key)
            return res.status(400).json({ success: false, message: 'Banner already exists' })
        }
        res.status(500).json({ success: false, message: err.message })
    }
}

const getBanner = async (req: Request, res: Response) => {
    try {
        const banner = await bannerModel.find()
        res.status(200).json({ success: true, data: banner })
    } catch (err: any) {
        res.status(500).json({ success: false, message: err.message })
    }
}

const deleteBanner = async (req: Request, res: Response) => {
    try {
        const banner = await bannerModel.findOne({ _id: req.params.id }) as IBanner
        const isDelete = await deleteFile(banner?.bannerImage.key)
        await bannerModel.deleteOne({ _id: req.params.id })
        res.status(200).json({ success: true, message: 'Banner deleted successfully' })
    } catch (err: any) {
        res.status(500).json({ success: false, message: err.message })
    }
}



export default { uploadBanner, getBanner, deleteBanner }