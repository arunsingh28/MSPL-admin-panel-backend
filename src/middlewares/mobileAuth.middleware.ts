import jwt from 'jsonwebtoken'
import userModel from '../Models/user.model'
import { Response, Request, NextFunction } from 'express'
import env from '../../config/env'


interface IToken {
    id: string;
    iat: number;
    exp: number;
}

export default async function (req: Request, res: Response, next: NextFunction) {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    }
    // token not found in header
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Token not found',
            statusCode: res.statusCode
        })
    }
    try {
        const decoded = jwt.verify(token, env._jwt_mobile_token_secret_key) as IToken;
        // const isAuth = await logedinModel.findOne({ user: (<any>decoded).id }).exec()
        // if (isAuth) {
        //     if (isAuth.isLoggedin === false) {
        //         return res.status(203).json({
        //             success: false,
        //             message: 'session out'
        //         })
        //     }
        // }
        console.log('decoded',decoded)
        const user = await userModel.findById((<any>decoded).id).exec()
        if (!user) {
            return res.status(203).json({
                success: false,
                message: 'user not found',
                statusCode: res.statusCode
            })
        } else {
            // pass to other function
            /* 
             create new session with current user
            */
            req.session.decoded = decoded;
            next()
        }
    }
    catch (error) {
        console.log(error)
        return res.status(401).json({
            success: false,
            message: "Unauthorized",
            error: (error as any).message,
            statusCode: res.statusCode
        })
    }

}

