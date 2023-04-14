import { Request, Response } from "express";
import userModel from "../../Models/user.model";
import academyModel from "../../Models/academy.model";

const updateUserProfile = async (req: Request, res: Response) => {
    try {
        const user = await userModel.findById(req.params.id);
        if (user) {
            user.measurement = {
                height: req.body.height,
                weight: req.body.weight,
            }
            user.language = req.body.language;
            user.email = req.body.email;
            user.name = req.body.name;
            user.dob = req.body.dob;
            user.gender = req.body.gender;
            user.phone = req.body.phone;
            const academy = await academyModel.findOne({ referalCode: req.body.academy }).exec();
            if (academy) {
                user.academy = academy._id;
            } else {
                return res.status(404).json({ success: false, message: "Academy not found" });
            }
            const updatedUser = await user.save();
            res.status(200).json({ success: true, data: updatedUser });
        } else {
            res.status(404).json({ success: false, message: "User not found" });
        }
    } catch (err: any) {
        res.status(500).json({ success: false, message: err.message });
    }
}

export default { updateUserProfile }