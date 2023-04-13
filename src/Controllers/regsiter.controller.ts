import { Request, Response } from "express";
import env from "../../config/env";
import empDB from "../Models/emp.model";
import token from '../Utils/tokens'
import mobilePort from "../Utils/isMobile";
import bcrypt from 'bcrypt'
import { sendEmail } from "../services/mail";

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
const registerEmp = async (req: Request, res: Response) => {
    try {
        const Roles = {
            'tl': [92, 91, 921, 922, 923, 924, 925, 926],
            'admin': [999, 91, 92, 921, 922, 923, 924, 925, 926, 93, 931, 932, 94, 941, 71, 942, 98, 981, 982, 983, 90, 901],
            'superAdmin': [999, 91, 92, 921, 922, 923, 924, 925, 926, 93, 931, 932, 94, 941, 71, 942, 95, 951, 952, 96, 97, 971, 972, 98, 981, 982, 983, 90, 901, 81, 811, 812, 813, 814, 815]
        }

        const permission = [
            {
                "role": "tl",
                "permision": Roles.tl
            },
            {
                "role": "superadmin",
                "permision": Roles.superAdmin
            },
            {
                "role": "admin",
                "permision": Roles.admin
            },
        ]
        const desireRole = (role: string) => {
            const roleIndex = permission.findIndex((item: any) => item.role === role)
            return permission[roleIndex].permision
        }
        const { email, phone, name, id, role } = req.body
        if (!name || !email || !phone || !id || !role) {
            return res.json({ message: 'please fill all the details', success: false })
        }
        // genrate password
        const password = generatePassword()
        const encrypt = await bcrypt.hash(password, bcrypt.genSaltSync(10))
        const newUser = await empDB.create({
            name,
            email,
            phone,
            empId: id,
            myClients: [null],
            role: desireRole(role),
            password: encrypt,
        })
        // create refresh tooken with _id for 1 day
        const refreshToken = token.refreshToken(newUser._id, role)
        // create access token with _id of 10 min
        const accessToken = token.accessToken(newUser._id, role)

        // send the mail
        await sendEmail(
            email,
            'Welcome to the team',
            `<h1>Hi ${name}</h1>
                <p>Thanks for joining us. Your account has been created. Please find your login details below.</p>
                <p>Username: ${email}</p>
                <p>Password: ${password}</p>
                <p>Role: ${role}</p>
                <p>To change the pasword follow this path <span style="color:'#0b0b0c';background:aliceblue;padding:2px 5px; border-radius:2px">setting>change password</span></p>
                <div><a href="http://143.110.186.93:3000/settings" target="_blank" style="padding:5px 15px;font-weight:900;background:#450fff;color:white;border-radius:4px;border:none;font-size:15px">Login</a></div>
                <p>Regards,</p>
                <p>Sports Mission IT Team</p>`
        )


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
        console.log(error)
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
            return res.status(409).json({ success: false, message: 'Already registerd. Please login again' })
        } else {
            // clear if any session there
            res.clearCookie('rf_session', {
                httpOnly: true,
                maxAge: env._register_rf_Cookie,
                sameSite: 'none',
                secure: true
            })
            console.log(error)
            // send the error message
            return res.status(500).json({ success: false, message: error?.message })
        }
    }
}


export default registerEmp