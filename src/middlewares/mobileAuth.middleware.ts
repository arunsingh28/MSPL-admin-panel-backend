import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'
import env from "../../config/env";

interface IToken {
    id: string;
    iat: number;
    exp: number;
}

export const mobileAuth = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    console.log({ authorization });
    if (authorization) {
        const token = authorization.split(' ')[1];
        try {
            const decoded = jwt.verify(token, env._jwt_mobile_token_secret_key) as IToken;
            if (decoded) {
                req.session.decoded = decoded;
                // pass the user
                next();
            } else {
                return res.status(401).json({ message: 'no user found', success: false })
            }
        } catch (error: any) {
            return res.status(401).json({ message: 'Unauthorized', error: error.message, success: false })
        }
    } else {
        return res.status(500).json({ message: 'server error', success: false })
    }
}
