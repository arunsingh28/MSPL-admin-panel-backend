import { Request, Response } from 'express';
import { IUser } from '../../Interface/User.interface';
import userModel from '../../Models/user.model';
import Formula from '../../services/Formula'
import jwt from 'jsonwebtoken'
import env from '../../../config/env'

// Register End User
const regsiterEndUser = async (req: Request, res: Response) => {

    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized', success: false, stautsCode: 401 })
    }
    // decode the token
    const decodedToken: any = await jwt.verify(token, env._jwt_mobile_token_secret_key as string)


    const { name, email, dob, height, weight, gender } = req.body;
    if (!name || !email || !dob || !height || !weight || !gender) {
        return res.status(400).json({ message: 'Please fill all the fields', success: false, stautsCode: 400 })
    }
    try {
        const BMR = await Formula.BMR(gender, height, weight, dob)
        const BMI = await Formula.BMI(height, weight)
        const newUser = await userModel.findById(decodedToken.id).exec()
        if (newUser) {
            newUser.BMI = BMI
            newUser.BMR = BMR
            newUser.name = name
            newUser.email = email
            newUser.measurement.height = height
            newUser.measurement.weight = weight
            newUser.gender = gender
            newUser.dob = dob
            newUser.profileTimeline = 'active'
            const savedUser = await newUser.save()
            return res.status(200).json({ message: 'User Registered Successfully', success: true, data: savedUser, stautsCode: 200 })
        } else {
            return res.status(400).json({ message: 'token tempared', success: false, stautsCode: 400 })
        }
    } catch (error: any) {
        if (error.code === 11000) {
            return res.status(409).json({ message: 'Email or Phone already exists', error: error.message, success: false, statusCode: 200 })
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
        console.log('user::',user)
        if (!user) {
            return res.status(404).json({ message: 'User not found', success: false, statusCode: 404 })
        }
        return res.status(200).json(user)
    } catch (error: any) {
        return res.status(500).json({ message: 'Internal Server Error', error: error.message, success: false, statusCode: 500 })
    }
}

// user table filter
const filterUser = async (req: Request, res: Response) => {
    // status : 'init' | 'active' | 'inactive' | 'all'
    // name : string
    let filterData;
    if (req.body.status === 'all') {
        if (req.body.name) {
            // filter data by name letter by letter with regex
            filterData = await userModel.find({ name: { $regex: req.body.name, $options: 'i' } }).exec()
            return res.status(200).json({ filterData })
        }
        filterData = await userModel.find().exec()
    }
    if (req.body.status === 'init') {
        if (req.body.name) {
            // filter data by name letter by letter with regex
            filterData = await userModel.find({ name: { $regex: req.body.name, $options: 'i' } }).exec()
            return res.status(200).json({ filterData })
        }
        filterData = await userModel.find({ profileTimeline: 'init' }).exec()
    }
    if (req.body.status === 'paid') {
        if (req.body.name) {
            // filter data by name letter by letter with regex
            filterData = await userModel.find({ name: { $regex: req.body.name, $options: 'i' } }).exec()
            return res.status(200).json({ filterData })
        }
        filterData = await userModel.find({ isPaid: true }).exec()
    }
    if (req.body.status === 'unpaid') {
        if (req.body.name) {
            // filter data by name letter by letter with regex
            filterData = await userModel.find({ name: { $regex: req.body.name, $options: 'i' } }).exec()
            return res.status(200).json({ filterData })
        }
        filterData = await userModel.find({ isPaid: false }).exec()
        filterData = filterData.filter((user: IUser) => user.profileTimeline !== 'init')
    }
    if (req.body.status === 'free') {
        if (req.body.name) {
            // filter data by name letter by letter with regex
            filterData = await userModel.find({ name: { $regex: req.body.name, $options: 'i' } }).exec()
            return res.status(200).json({ filterData })
        }
        filterData = await userModel.find({ nutritionist: undefined }).exec()
        // remove the lead user
        filterData = filterData.filter((user: IUser) => user.profileTimeline !== 'init')
    }
    if (req.body.status === 'attached') {
        if (req.body.name) {
            // filter data by name letter by letter with regex
            filterData = await userModel.find({ name: { $regex: req.body.name, $options: 'i' } }).exec()
            return res.status(200).json({ filterData })
        }
        filterData = await userModel.find({ nutritionist: { $exists: true } })
    }
    return res.status(200).json({ filterData })
}

export default { regsiterEndUser, getAllUsers, getUserById, filterUser } 