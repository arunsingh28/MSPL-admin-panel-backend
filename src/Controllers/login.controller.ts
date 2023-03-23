import { Request, Response } from "express";
import userModel from "../Models/emp.model";
import token from '../Utils/tokens'
import jwt from 'jsonwebtoken'
import env from "../../config/env";
import otpGenrator from "../Utils/otpGenrator";
import mobilePort from '../Utils/isMobile'
import bcrypt from 'bcrypt'
import { RegisterDocument } from "../Interface/emp.interface";


const sendOtp = async (req: Request, res: Response) => {
    const { phone } = req.body
    if (phone.length <= 9) {
        return res.json({ message: 'Enter valid phone number', agent: req.useragent })
    }
    if (!phone) return res.json({ message: 'please enter you register number', agent: req.useragent })
    const user = await userModel.findOne({ phone }).exec()
    if (user) {
        try {
            const phoneToken = token.loginToken(user._id, user.role)
            // https cookie
            res.cookie('ph_session', phoneToken, {
                httpOnly: true,
                maxAge: env._login_token_cookie,
                sameSite: 'none',
                secure: true
            })
            // change the otp
            otpGenrator(user?._id, res)
            // get device type
            const isMobile = mobilePort(req)
            if (isMobile) {
                return res.status(200).json({ otp: user.otp, token: phoneToken, message: 'OTP send to your number' })
            }
            return res.status(200).json({ otp: user.otp, message: 'OTP send to your mobile number' })
        }
        catch (error: any) {
            console.log(error)
            return res.status(500).json({ message: 'server error' })
        }
    }
    else {
        // not found the phone
        return res.status(404).json({ success: false, message: `User not found with ${phone}` })
    }
}


const verifyOtp = async (req: Request, res: Response) => {
    const { otp } = req.body
    const cookie = req.cookies?.ph_session
    if (!otp) return res.json({ message: 'please enter you register number' })
    if (!cookie) return res.json({ message: 'session expire login agian. ', code: 1 })
    try {
        const decoded = jwt.verify(cookie, env._jwt_login_token_secret_key)
        const user = await userModel.findById((<any>decoded).id).exec()
        const role = (<any>decoded).role
        // create accessToken 
        const accessToken = token.accessToken(user?._id, role)
        // create refreshtoken
        const refreshToken = token.refreshToken(user?._id, role)
        if (otp != user?.oldOtp) {
            return res.json({ message: 'incorrect OTP. ', code: 0 })
        }
        // delete previous cookie
        res.clearCookie('ph_session', {
            httpOnly: true,
            sameSite: 'none',
            secure: true
        })
        // create new rf cookie
        res.cookie('rf_session', refreshToken, {
            httpOnly: true,
            sameSite: 'none',
            maxAge: env._register_rf_Cookie,
            secure: true
        })
        // for mobile send refreshtoken
        const isMobile = mobilePort(req)
        if (isMobile) {
            return res.status(200).json({
                success: true,
                message: 'login successfully',
                refreshToken,
                // data: { firstName: user?.firstName, lastName: user?.lastName }
                data: { name: user?.name }
            })
        }
        // for desktop send accesstoken 
        return res.status(200).json({
            success: true,
            message: 'login successfully',
            accessToken,
            // data: { firstName: user?.firstName, lastName: user?.lastName }
            data: { name: user?.name }
        })
    } catch (error: any) {
        // clear previous rf_token
        res.clearCookie('rf_session', {
            httpOnly: true,
            sameSite: 'none',
            secure: true,
        })
        return res.status(404).json({ success: false, message: error.message })
    }
}

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
    const isEmp = await userModel.findOne({_id}).exec()
    const isMatch = await bcrypt.compare(oldPassword, (isEmp as RegisterDocument).password)
    if (!isMatch) {
        return res.json({ message: 'old password is incorrect', success: false })
    }else{
        const decrpt = await bcrypt.hash(newPassword, 10)
        const update = await userModel.findByIdAndUpdate(_id, { password: decrpt }).exec()
        if(update){
            return res.json({ message: 'password change successfully', success: true })
        }else{
            return res.json({ message: 'something went wrong', success: false })
        }
    }
}

export default { sendOtp, verifyOtp, verifyLogin, changePassword }