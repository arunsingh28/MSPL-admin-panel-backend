import { Request, Response } from "express";
import userModel from "../Models/emp.Model";
import bcrypt from 'bcrypt';
import token from '../Utils/tokens'
import env from "../../config/env";
import mobilePort from '../Utils/isMobile'
import LoggedInModel from '../Models/logedin.Model'


const loginWithPassword = async (req: Request, res: Response) => {
    const { email, password } = req.body
    if (!email) return res.json({ message: 'please enter you register email.', success: false })
    if (!password) return res.json({ message: 'please enter you register password.', success: false })
    const user = await userModel.findOne({ email }).exec()
    if (!user) return res.json({ message: 'email is not registerd', success: false })
    try {
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.json({ message: 'email or password is incorrect.', success: false })


        // refresh token and access token
        const refreshToken = token.refreshToken(user._id, user.role)
        const accessToken = token.accessToken(user._id, user.role)

        // save the token in db and update the token and time 
        const isAlreadyLogedin = await LoggedInModel.findOne({ user: user._id }).exec()
        if (isAlreadyLogedin) {
            await LoggedInModel.findOneAndUpdate({
                user: user._id
            }, {
                $set: { isLoggedin: true, updatedAt: new Date(), token: refreshToken }
            })
        }
        else {
            const newLogedin = new LoggedInModel({
                user: user._id,
                token: refreshToken,
                isLoggedin: true,
            })
            await newLogedin.save()
        }
        // check if user is mobile or not
        const isMobile = mobilePort(req)
        if (isMobile) {
            return res.status(200).json({
                success: true, message: 'login successfully', accessToken, refreshToken,
                user: {
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    _id: user._id,
                    isMute: user.isMute
                }
            })
        } else {
            res.cookie('rf_session', refreshToken, {
                maxAge: env._register_rf_Cookie,
                secure: true,
                httpOnly: true,
                sameSite: 'none',
            })
            return res.status(200).json({
                success: true, message: 'login successfully', accessToken,
                user: {
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    _id: user._id,
                    isMute: user.isMute
                }
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'something went wrong', agent: req.useragent, success: false })
    }
}


export default { loginWithPassword }