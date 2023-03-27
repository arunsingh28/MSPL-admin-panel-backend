import { Request, Response } from 'express';
import userModel from '../../Models/user.model';
import Formula from '../../services/Formula'

// Register End User
const regsiterEndUser = async (req: Request, res: Response) => {
    const { name, email, phone, dob, height, weight, gender } = req.body;
    if (!name || !email || !phone || !dob || !height || !weight || !gender) {
        return res.status(400).json({ message: 'Please fill all the fields', success: false, stautsCode: 400 })
    }
    try {
        const BMR = await Formula.BMR(gender, height, weight, dob)
        const BMI = await Formula.BMI(height, weight)
        const newUser = new userModel({
            name,
            email,
            phone,
            dob,
            gender,
            BMR,
            BMI,
            measurement: {
                height,
                weight,
            }
        })
        const savedUser = await newUser.save()
        return res.status(200).json({ message: 'User Registered Successfully', success: true, data: savedUser, stautsCode: 200 })
    } catch (error: any) {
        if (error.code === 11000) {
            return res.status(200).json({ message: 'Email or Phone already exists', error: error.message, success: false, statusCode: 200 })
        }
        return res.status(500).json({ message: 'Internal Server Error', error: error.message, success: false, statusCode: 500 })
    }
}

// Get all users
const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await userModel.find()
        return res.status(200).json(users)
    } catch (error: any) {
        return res.status(500).json({ message: 'Internal Server Error', error: error.message, success: false, statusCode: 500 })
    }
}

// get user by ID
const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await userModel.findById(req.params.id)
        return res.status(200).json(user)
    } catch (error: any) {
        return res.status(500).json({ message: 'Internal Server Error', error: error.message, success: false, statusCode: 500 })
    }
}

export default { regsiterEndUser, getAllUsers, getUserById } 