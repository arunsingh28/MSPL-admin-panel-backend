import { Request, Response } from 'express';
import userModel from '../Models/user.Model';


const regsiterEndUser = async (req: Request, res: Response) => {
    const { name, email, phone, dob, height, weight, password, sex } = req.body;
    if (!name || !email || !phone || !dob || !height || !weight || !sex) {
        return res.status(400).json({ message: 'Please fill all the fields', success: false })
    }
    try {
        const newUser = new userModel({
            name,
            email,
            phone,
            dob,
            sex,
            measurement: {
                height,
                weight,
            },
            password
        })
        const savedUser = await newUser.save()
        return res.status(200).json({ message: 'User Registered Successfully', success: true, data: savedUser })
    } catch (error: any) {
        if (error.code === 11000) {
            return res.status(200).json({ message: 'Email or Phone already exists', error: error.message, success: false })
        }
        return res.status(500).json({ message: 'Internal Server Error', error: error.message, success: false })
    }
}

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await userModel.find()
        return res.status(200).json(users)
    } catch (error: any) {
        return res.status(500).json({ message: 'Internal Server Error', error: error.message, success: false })
    }
}

const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await userModel.findById(req.params.id)
        return res.status(200).json(user)
    } catch (error: any) {
        return res.status(500).json({ message: 'Internal Server Error', error: error.message, success: false })
    }
}

export default { regsiterEndUser, getAllUsers, getUserById } 