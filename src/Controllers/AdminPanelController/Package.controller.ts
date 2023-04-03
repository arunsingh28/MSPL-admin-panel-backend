import { Request, Response } from "express";
import packageModel from "../../Models/package.model";

// Save package
const handleSavePackage = async (req: Request, res: Response) => {
    const { packageData, points } = req.body
    try {
        await packageModel.create({
            packageName: packageData.name,
            packagePrice: packageData.price,
            packageDescription: packageData.description,
            packageDuration: packageData.duration,
            packageDurationUnit: packageData.durationUnit,
            packagePoint: points,
            packageChild: packageData?.child,
        })
        return res.status(200).json({
            message: 'Package save successfully',
            success: true,
            statusCode: res.statusCode
        })
    }
    catch (error: any) {
        if (error.code === 11000) {
            return res.status(400).json({
                message: 'Package already exists',
                success: false,
                data: null,
                statusCode: res.statusCode
            })
        }
        return res.status(500).json({
            message: 'Something went wrong',
            success: false,
            data: null,
            statusCode: res.statusCode
        })
    }
}

// Get all packages
const handleGetAllPackages = async (req: Request, res: Response) => {
    try {
        const packages = await packageModel.find().exec()
        return res.status(200).json({
            success: true,
            data: packages,
            statusCode: res.statusCode
        })
    }
    catch (error: any) {
        return res.status(500).json({
            message: 'Something went wrong',
            success: false,
            data: null,
            statusCode: res.statusCode
        })
    }
}

export default { handleSavePackage, handleGetAllPackages }