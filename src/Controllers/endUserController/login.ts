import { Request, Response } from 'express';
import userModel from '../../Models/user.model';
import tokens from '../../Utils/tokens';
import otpGenrator from '../../Utils/otpGenrator';
import jwt from 'jsonwebtoken'
import env from '../../../config/env';
import sendOTP from '../../services/sendOTP';

// login with phone number return otp to mobile number
const loginWithPhone = async (req: Request, res: Response) => {
    const isUser = await userModel.findOne({ phone: req.body.phone }).exec();
    try {
        if (isUser) {
            // send the otp to mobile number
            sendOTP(isUser.oldOtp, isUser.phone);
            /* 
            send the access token to the user with 
            payload:  user id      
            */
            const otpAccessToken = tokens.mobileOtpToken(isUser._id); // time 5 min
            // send the respoonse to client
            return res.status(200).json({
                message: 'OTP send to your mobile number',
                accessToken: otpAccessToken,
                success: true,
                isExists: true,
                data: null,
                stautsCode: res.statusCode
            })
        } else {
            // user not exist
            return res.status(200).json({
                message: 'User not found',
                success: false,
                isExists: false,
                data: null,
                stautsCode: res.statusCode
            })
        }
    } catch (error: any) {
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message,
            success: false,
            statusCode: res.statusCode
        })
    }
}

const verifyOTP = async (req: Request, res: Response) => {
    const { otp } = req.body
    const token: any = req.headers.authorization?.split(' ')[1];
    try {
        // debug the token
        const userId: any = jwt.verify(token, env._jwt_mobile_token_secret_key)
        const user = await userModel.findById(userId.id).exec();
        if (user) {
            // checking the otp
            if (otp == user?.oldOtp) {
                // send the access token to the user with 
                // payload:  user id      
                const accessToken = tokens.mobileToken(user._id);
                // reset the otp
                await otpGenrator(user._id, res);
                // send the respoonse to client
                return res.status(200).json({
                    message: 'OTP verified',
                    accessToken,
                    success: true,
                    isExists: true,
                    isAuthenticated: true,
                    data: user,
                    stautsCode: res.statusCode
                })
            } else {
                return res.status(200).json({
                    message: 'Incorect OTP',
                    success: false,
                    isAuthenticated: false,
                    isExists: true,
                    stautsCode: res.statusCode
                })
            }
        }
    } catch (error: any) {
        if (error.name == 'TokenExpiredError') return res.status(401).json({
            message: 'OTP expired',
            success: false,
            isAuthenticated: false,
            statusCode: res.statusCode
        })
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message,
            success: false,
            isAuthenticated: false,
            statusCode: res.statusCode
        })
    }
}



export default { loginWithPhone, verifyOTP }