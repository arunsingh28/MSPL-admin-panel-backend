import empModel from '../Models/emp.Model';
import { Request, Response } from 'express';


const updateSoundSetting = async (req: Request, res: Response) => {
    const { loginNotification, logoutNotification, deleteNotification } = req.body
    const { _id } = req.params
    try {
        const isUser = await empModel.findOne({ _id }).exec()
        if (!isUser) {
            return res.json({ success: false, message: 'User not found' })
        }
        isUser.isMute.loginNotification = loginNotification;
        isUser.isMute.logoutNotification = logoutNotification;
        isUser.isMute.deleteNotification = deleteNotification;
        await isUser.save()
        return res.json({ success: true, message: 'Sound setting updated' })
    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: 'Something went wrong' })
    }
}


const sendSoundSetting = async (req: Request, res: Response) => {
    const { _id } = req.params
    try {
        const isSoundNotification = await empModel.findOne({ _id }).exec()
        if (!isSoundNotification) {
            return res.json({ success: false, message: 'User not found' })
        }
        return res.json({ success: true, message: 'Sound setting', data: isSoundNotification.isMute })
    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: 'Something went wrong' })
    }

}

export default { updateSoundSetting, sendSoundSetting }