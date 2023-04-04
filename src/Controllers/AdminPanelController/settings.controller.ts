import { Request, Response } from "express";
import userModel from "../../Models/emp.model";
import jwt from 'jsonwebtoken'
import env from "../../../config/env";
import bcrypt from 'bcrypt'
import { EmpDocument } from "../../Interface/emp.interface";


const verifyLogin = async (req: Request, res: Response) => {
    const { token } = req.params
    if (!token) return res.json({ success: true })
    try {
        const decoded = jwt.verify(token, env._jwt_access_token_secret_key)
        const user = await userModel.findById((<any>decoded).id).exec()
        if (user) {
            return res.json({
                user: {
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    _id: user._id
                },
                token,
                success: true,
            })
        }
        return res.json({ success: true })
    }
    catch (error: any) {
        return res.json({ success: true })
    }
}

const changePassword = async (req: Request, res: Response) => {
    const { oldPassword, newPassword } = req.body
    const { _id } = req.params
    const isEmp = await userModel.findOne({ _id }).exec()
    const isMatch = await bcrypt.compare(oldPassword, (isEmp as EmpDocument).password)
    if (!isMatch) {
        return res.json({ message: 'old password is incorrect', success: false })
    } else {
        const decrpt = await bcrypt.hash(newPassword, 10)
        const update = await userModel.findByIdAndUpdate(_id, { password: decrpt }).exec()
        if (update) {
            return res.json({ message: 'password change successfully', success: true })
        } else {
            return res.json({ message: 'something went wrong', success: false })
        }
    }
}

export default { verifyLogin, changePassword }