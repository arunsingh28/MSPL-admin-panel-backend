import { Request, Response } from "express";
import userModel from "../../Models/user.model";
import empModel from '../../Models/emp.model'
import RecipeModel from "../../Models/recipies.model";
import bannerModel from '../../Models/mobile.banner.model'
import recipeCategoryModel from '../../Models/recipiCategory.model'



const saveWaterIntake = async (req: Request, res: Response) => {
    try {
        const user = await userModel.findById(req.session.decoded?.id);
        if (user) {
            // add 200 ml of water 
            user.waterIntake = user.waterIntake + 200;
            await user.save();
            return res.status(200).json({ success: true, message: 'Water Intake Saved', consumeWater: user.waterIntake, statusCode: res.statusCode });
        } else {
            return res.status(401).json({ success: false, message: 'User not found', statusCode: res.statusCode });
        }
    } catch (err: any) {
        return res.status(200).json({ message: err.message, success: false });
    }
}

const saveWaterOuttake = async (req: Request, res: Response) => {
    try {
        const user = await userModel.findById(req.session.decoded?.id);
        if (user) {
            // add 200 ml of water 
            user.waterIntake = user.waterIntake - 200;
            await user.save();
            return res.status(200).json({ success: true, message: 'Water outtake Saved', consumeWater: user.waterIntake, statusCode: res.statusCode });
        } else {
            return res.status(401).json({ success: false, message: 'User not found', statusCode: res.statusCode });
        }
    } catch (err: any) {
        return res.status(200).json({ message: err.message, success: false });
    }
}

// nutrion profile
const nutritionProfile = async (req: Request, res: Response) => {
    try {
        const nutrisist = await empModel.findById(req.params.id).populate('profile')
        if (nutrisist) {
            return res.status(200).json({ success: true, data: nutrisist, statusCode: res.statusCode })
        } else {
            return res.status(200).json({ success: false, data: null, statusCode: res.statusCode })
        }
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', success: false, statusCode: res.statusCode })
    }
}

const sendAllRecipie = async (req: Request, res: Response) => {
    try {
        const recipie = await RecipeModel.find({}).exec()
        if (recipie) {
            return res.status(200).json({ success: true, data: recipie, statusCode: res.statusCode })
        }
    } catch (error: any) {
        return res.status(500).json({ message: error.message, success: false, statusCode: res.statusCode })
    }
}



const sendRecipieByCategory = async (req: Request, res: Response) => {
    const category = req.params.category
    const page = Number(req.query["page"]) || 1
    const limit = Number(req.query["limit"]) || 10
    const skip = (page - 1) * limit
    try {
        // find the recipie by category inside tags of recipie
        const recipe = await RecipeModel.find({ tags: category }).skip(skip).limit(limit).exec()
        if (recipe) {
            return res.status(200).json({ success: true, data: recipe, statusCode: res.statusCode })
        }
    } catch (error: any) {
        return res.status(500).json({ message: error.message, success: false, statusCode: res.statusCode })
    }
}


const getBanner = async (req: Request, res: Response) => {
    try {
        const banner = await bannerModel.find()
        res.status(200).json({ success: true, data: banner })
    } catch (err: any) {
        res.status(500).json({ success: false, data: null })
    }
}


const homePage = async (req: Request, res: Response) => {
    try {
        const user = await userModel.findById(req.params.id).exec()
        const banner = await bannerModel.find().exec()
        if (user) {
            return res.status(200).json({
                success: true, data: {
                    calories: 0,
                    user: user,
                    sportsList: ['Cricket', 'Badminton', 'Football'],
                    banner: banner
                }, statusCode: res.statusCode
            })
        } else {
            return res.status(200).json({ success: false, data: null, statusCode: res.statusCode })
        }
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', success: false, statusCode: res.statusCode })
    }
}

const getFoodCategory = async (req: Request, res: Response) => {
    try {
        const foodCategory = await recipeCategoryModel.find().exec()
        res.status(200).json({ success: true, data: foodCategory })
    } catch (err: any) {
        res.status(500).json({ success: false, message: err.message })
    }
}

export default { saveWaterIntake, nutritionProfile, getFoodCategory, homePage, sendAllRecipie, getBanner, sendRecipieByCategory, saveWaterOuttake }