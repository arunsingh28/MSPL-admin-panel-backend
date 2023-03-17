import { Response } from 'express'
import endUser from '../Models/user.Model'


export default async function otpGenrator(_id: string, res: Response) {
    // genrate 6 digit new otp
    const otp = Math.floor(100000 + Math.random() * 900000);
    // fetch old otp
    const user = await endUser.findById(_id)
    try {
        // update otp in DB
        await endUser.findOneAndUpdate({ _id },
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
            statusCode: res.statusCode
        })
    }
}