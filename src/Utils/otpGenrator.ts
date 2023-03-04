import { Response } from 'express'
import _user from '../Models/emp.Model'


export default async function otpGenrator(_id: string, res: Response) {
    // genrate 6 digit new otp
    const otp = Math.floor(100000 + Math.random() * 900000);
    // fetch old otp
    const user = await _user.findById(_id)
    try {
        // update otp in DB
        await _user.findOneAndUpdate({ _id },
            {
                $set: {
                    oldOtp: user?.otp,
                    otp
                }
            }
        );
    } catch (error) {
        console.log('****Error from OTP genrator modules****', error)
        return res.status(500).json({
            message: 'server error',
            code: res.statusCode
        })
    }
}