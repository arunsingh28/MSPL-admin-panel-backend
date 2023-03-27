import empModel from '../Models/emp.model'
import jwt from 'jsonwebtoken'
import { Request, Response } from 'express'
import env from '../../config/env'
import token from '../Utils/tokens'

interface IRefreshToken {
   id: string
   role: number[]
   iat: number
   exp: number
}

const handleRefreshToken = async (req: Request, res: Response) => {
   console.log('cookies:', req.cookies.rf_session)
   const refreshToken = req.cookies.rf_session
   if (!refreshToken) return res.status(401).json({ message: 'Access Denied' })
   try {
      const verified = jwt.verify(refreshToken, env._jwt_refresh_token_secret_key) as IRefreshToken
      const user = await empModel.findById(verified.id).exec()
      if (!user) return res.status(401).json({ message: 'Access Denied' })
      const accessToken = token.accessToken(user._id, user.role)
      res.cookie('rf_session', accessToken, { httpOnly: true })
      res.json({ accessToken })
   }
   catch (err: any) {
      res.status(400).json({ message: err.message })
   }
}


export default handleRefreshToken