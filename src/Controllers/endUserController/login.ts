import { Request, Response } from 'express';
import userModel from '../../Models/user.model';
import tokens from '../../Utils/tokens';
import otpGenrator from '../../Utils/otpGenrator';
import jwt from 'jsonwebtoken'
import env from '../../../config/env';
import sendOTP from '../../services/mobileOTP';
import newUser from '../../Models/newUser.model';
import { sendEmail } from '../../services/mail';

// login with phone number return otp to mobile number
const loginWithPhone = async (req: Request, res: Response) => {

    if (!req.body.phone) return res.status(400).json({
        message: 'Phone number is required',
        success: false,
        data: null,
        statusCode: res.statusCode
    })

    if (req.body.phone.length < 10) return res.status(400).json({
        message: 'Phone number must be 10 digit',
        success: false,
        data: null,
        statusCode: res.statusCode
    })

    // check it user entered number only or not
    const isNumber = /^\d+$/.test(req.body.phone);
    if (!isNumber) return res.status(400).json({
        message: 'Phone number must be number only',
        success: false,
        data: null,
        statusCode: res.statusCode
    })

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
            const isNewUser = await newUser.findOne({ phone: req.body.phone }).exec();
            if (isNewUser) {
                // send the otp to mobile number
                const otpres = sendOTP(isNewUser.oldOtp, isNewUser.phone);
                /* 
                send the access token to the user with 
                payload:  user id      
                */
                const otpAccessToken = tokens.mobileOtpToken(isNewUser._id); // time 5 min
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
                const user = await new newUser({ phone: req.body.phone }).save()
                // send the token to client
                const otpAccessToken = tokens.mobileOtpToken(user._id);
                // send the otp to mobile number
                sendOTP(user.oldOtp, user.phone);

                return res.status(200).json({
                    message: 'OTP send to your mobile number',
                    accessToken: otpAccessToken,
                    success: true,
                    isExists: false,
                    data: null,
                    stautsCode: res.statusCode
                })
            }
        }
    } catch (error: any) {
        console.log('ERROR:::::', error)
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
        } else {
            const tt = await newUser.findById(userId.id).exec();
            if (tt) {
                console.log('tt', tt)
                // checking the otp
                if (otp == tt?.oldOtp) {
                    // send the access token to the user with 
                    // payload:  user id      
                    // reset the otp
                    // await otpGenrator(tt._id, res);
                    await newUser.findByIdAndUpdate(tt._id, {
                        $set: {
                            oldOtp: tt?.otp,
                            otp: Math.floor(100000 + Math.random() * 900000)
                        }
                    }).exec()

                    const convetuser = await userModel.create({
                        phone: tt.phone,
                        profileTimeline: 'init'
                    })
                    // send the access token to the user with
                    const accessToken = tokens.mobileToken(convetuser._id);
                    // delete the user from new user collection
                    await newUser.findByIdAndDelete(tt._id).exec()

                    // send the respoonse to client
                    return res.status(200).json({
                        message: 'OTP verified',
                        accessToken,
                        success: true,
                        isExists: true,
                        isAuthenticated: true,
                        data: null,
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
        }
    } catch (error: any) {
        console.log('error', error)
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