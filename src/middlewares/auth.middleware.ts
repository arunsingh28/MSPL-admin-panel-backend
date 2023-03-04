import jwt from 'jsonwebtoken'
import registerUser from '../Models/emp.Model'
import logedinModel from '../Models/logedin.Model'
import { RegisterDocument } from '../Interface/emp.interface'
import { Response, Request, NextFunction } from 'express'
import env from '../../config/env'

const authorization = async (req: Request, res: Response, next: NextFunction) => {
    let token;
    if (req.cookies.rf_session) {
        token = req.cookies.rf_session
    }
    // token not found in header
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Token not found'
        })
    }
    try {
        const decoded = jwt.verify(token, env._jwt_refresh_token_secret_key);
        const isAuth = await logedinModel.findOne({ user: (<any>decoded).id }).exec()
        if (isAuth) {
            if (isAuth.isLoggedin === false) {
                return res.status(203).json({
                    success: false,
                    message: 'session out'
                })
            }
        }
        const user: RegisterDocument | null = await registerUser.findById((<any>decoded).id).exec()
        if (!user) {
            return res.status(203).json({
                success: false,
                message: 'user not found'
            })
        } else {
            // pass to other function
            /* 
             create new session with current user
            */
            req.session.user = user
            next()
        }
    }
    catch (error) {
        console.log('-----error-----', error)
        return res.status(401).json({
            success: false,
            message: "Unauthorized",
            error: (error as any).message
        })
    }

}

export default authorization