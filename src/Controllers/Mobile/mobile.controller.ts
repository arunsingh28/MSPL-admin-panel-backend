import { Request, Response } from "express";
import userModel from "../../Models/user.model";


const saveWaterIntake = async (req: Request, res: Response) => {
    // console.log('ID:', req.session.decoded?.id)
    try {
        const user = await userModel.findById(req.session.decoded?.id);
        if (user) {
            // add 200 ml of water 
            user.waterIntake = user.waterIntake + 200;
            await user.save();
            return res.status(200).json({ success: true, message: 'Water Intake Saved' });
        } else {
            return res.status(401).json({ success: false, message: 'User not found' });
        }
    } catch (err: any) {
        return res.status(200).json({ message: err.message, success: false });
    }
}

export default { saveWaterIntake }