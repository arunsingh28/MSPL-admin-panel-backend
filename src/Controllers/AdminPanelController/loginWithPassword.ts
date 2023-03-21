import { Request, Response } from "express";
import userModel from "../../Models/emp.Model";
import bcrypt from 'bcrypt';
import token from '../../Utils/tokens'
import env from "../../../config/env";
import LoggedInModel from '../../Models/logedin.Model'


interface IisAlreadyLogedin {
    user: string
    token: string
    _id: string
    isLoggedin: boolean
    device: number
}

const loginWithPassword = async (req: Request, res: Response) => {
    const { email, password } = req.body
    if (!email) return res.json({ message: 'please enter you register email.', success: false })
    if (!password) return res.json({ message: 'please enter you register password.', success: false })
    const user = await userModel.findOne({ email }).exec()
    if (!user) return res.json({ message: 'email is not registerd', success: false })
    try {
        // comparing passowrd with hash password
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.json({ message: 'Invalid Credentials', success: false })

        // refresh token and access token
        const refreshToken = token.refreshToken(user._id, user.role)
        const accessToken = token.accessToken(user._id, user.role)

        // save the token in db and update the token and time 


        res.cookie('rf_session', refreshToken, {
            maxAge: env._rf_cookies_max_age,
            secure: true,
            httpOnly: true,
            sameSite: 'none',
        })
        return res.status(200).json({
            success: true, message: 'login successfully', accessToken,
            data: user,
            isAuthenticated: true,
            user: {
                name: user.name,
                email: user.email,
                role: user.role,
                _id: user._id,
                isMute: user.isMute
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'something went wrong', success: false })
    }
}


export default { loginWithPassword }