import { Request, Response } from "express";
import env from "../../config/env";
import user from "../Models/emp.Model";
import token from '../Utils/tokens'
import mobilePort from "../Utils/isMobile";
import bcrypt from 'bcrypt'


// genrate 8 char randmon password
export const generatePassword = () => {
    var pass = '';
    var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
        'abcdefghijklmnopqrstuvwxyz0123456789@#$';

    for (let i = 1; i <= 8; i++) {
        var char = Math.floor(Math.random()
            * str.length + 1);

        pass += str.charAt(char)
    }
    return pass;
}

// auto generate id and password
const registerUser = async (req: Request, res: Response) => {
    const { email, phone, name, id, role } = req.body

    // data check if not null
    // if (!firstName || !lastName || !email || !password || !phone || !dob || !gender || !state || !city) {
    if (!name || !email || !phone) {
        return res.json({ message: 'please fill all the details', success: false })
    } else {
        // save to db
        try {
            // check user is already registerd
            const isExist = await user.findOne({ email: email, empId: id }).exec()
            if (isExist) {
                return res.status(409).json({ success: false, message: 'Already registerd. Please login' })
            }
            // genrate password
            const password = generatePassword()
            const referral_code = Math.random().toString(36).substr(5)
            const encrypt = await bcrypt.hash(password, bcrypt.genSaltSync(10))
            const newUser = new user({
                // firstName, lastName, email, phone, dob, gender, password,
                // address: { city, state, street },
                name, email, phone, password: encrypt, role, empId: id, referral_code
            })
            // save to db
            await newUser.save()
            // create refresh tooken with _id for 1 day
            const refreshToken = token.refreshToken(newUser._id, role)
            // create access token with _id of 10 min
            const accessToken = token.accessToken(newUser._id, role)

            const isMobile = mobilePort(req)
            if (isMobile) {
                return res.status(201).json({ success: true, message: 'User register successfully', password, token: refreshToken, })
            }
            // send the accessToken with cookie
            res.cookie('rf_session', refreshToken, {
                httpOnly: true,
                maxAge: env._register_rf_Cookie,
                sameSite: 'none',
                secure: true
            })
            /* 
            send success mail to user  
                ..
                ..
                ..
            */
            return res.status(201).json({ success: true, message: 'User register successfully', password, token: accessToken })
        } catch (error: any) {
            if (error.errors?.phone) {
                return res.status(500).json({ success: false, message: error.errors.phone.properties.message })
            }
            if (error.errors?.email) {
                return res.status(500).json({ success: false, message: error.errors.email.properties.message })
            }
            if (error.code === 11000) {
                // clear if any session there
                res.clearCookie('rf_session', {
                    httpOnly: true,
                    maxAge: env._register_rf_Cookie,
                    sameSite: 'none',
                    secure: true
                })
                return res.status(409).json({ success: false, message: 'Already registerd. Please login' })
            } else {
                // clear if any session there
                res.clearCookie('rf_session', {
                    httpOnly: true,
                    maxAge: env._register_rf_Cookie,
                    sameSite: 'none',
                    secure: true
                })
                // send the error message
                return res.status(500).json({ success: false, message: error?.message })
            }
        }
    }
}


export default registerUser