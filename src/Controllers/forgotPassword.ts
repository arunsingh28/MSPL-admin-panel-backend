import { Request, Response } from "express";
import empModel from "../Models/emp.model";
import tokenGenrator from '../Utils/tokens'
import env from '../../config/env'
import { sendEmail } from '../Utils/email'

const forgotPassword = async (req: Request, res: Response) => {
    const { email } = req.body;
    try {
        if (!email || email === '') {
            return res.status(400).json({ message: 'Email is required', success: false })
        }
        const isUser = await empModel.findOne({ email: email }).exec();
        if (!isUser) {
            return res.status(400).json({ message: 'Email is not registered', success: false })
        }
        // send the session token to the user's email
        const token = tokenGenrator.accessToken(isUser._id, isUser.role);
        const url = `${env.prod_url}/reset-password/&token${token}`;
        // send mail with defined transport object
        const info = await sendEmail(email, env.MAIL_RESET_PASSWORD, isUser.name);
        if (info === 'Message sent: %s') {
            return res.status(200).json({ message: 'Reset password link sent to your email', success: true })
        }
        return res.status(500).json({ message: 'Something went wrong', success: false })
    } catch (err: any) {
        return res.status(500).json({ message: err.message, success: false })
    }
}


export default { forgotPassword }