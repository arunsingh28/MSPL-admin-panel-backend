import empModel from '../Models/emp.Model'
import jwt from 'jsonwebtoken'
import { Request, Response } from 'express'

const handleRefreshToken = async (req: Request, res: Response) => {
   console.log('cookies:',req.cookies)
   return res.json({message:'ok'})
}


export default handleRefreshToken