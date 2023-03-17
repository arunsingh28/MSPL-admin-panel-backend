import loggedinModel from '../Models/logedin.Model';
import { Request, Response } from 'express';


const logout = async (req: Request, res: Response) => {
    const cookie = req.cookies['rf_session'];
    console.log('cookies',cookie)
    const isMatch = await loggedinModel.findOne({ token: cookie }).exec()
    // remove cookies
    try {
        isMatch.isLoggedin = false
        isMatch.token = ''
        await isMatch.save()
        res.clearCookie('rf_session')
        return res.json({ success: true, message: 'logout successfully' })
    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: 'Something went wrong' })
    }
}


export default logout