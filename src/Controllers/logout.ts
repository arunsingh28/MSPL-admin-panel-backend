import loggedinModel from '../Models/logedin.Model';
import { Request, Response } from 'express';


const logout = async (req: Request, res: Response) => {
    const cookie = req.cookies['rf_session'];
    // const isMatch = await loggedinModel.findOne({ token: cookie }).exec()
    // console.log('logout', isMatch)
    // remove cookies
    try {
        // isMatch.isLoggedin = false
        // if (isMatch.device === 1) {
        //     isMatch.isLoggedin = false
        // }
        // isMatch.token = ''
        // isMatch.device = (isMatch.device - 1)
        // await isMatch.save()
        res.clearCookie('rf_session')
        return res.json({ success: true, message: 'logout successfully' })
    } catch (error) {
        console.log(error)
        res.clearCookie('rf_session')
        return res.json({ success: true, message: 'Something went wrong' })
    }
}


export default logout