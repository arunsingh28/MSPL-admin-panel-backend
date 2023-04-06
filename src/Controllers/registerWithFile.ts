import { Request, Response } from 'express';
import xlsx from 'xlsx';
import schoolModel from '../Models/school.model';
import empModel from '../Models/emp.model'
import { generatePassword } from './regsiter.controller';
import Roles from '../../config/role';
import removeFile from '../Utils/removeFile';

const registerSchoolWithFile = async (req: Request, res: Response) => {
    try {
        // check if file is uploaded
        if (req.file === undefined) {
            return res.status(400).send("Please upload a exel file!");
        } else {
            // read excel file 
            const workbook = xlsx.readFile(req.file.path);
            const sheet_name_list = workbook.SheetNames;
            const xlData: any = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
            // check the file format is valid or not
            if (!xlData[0].schoolName) {
                return res.status(403).json({ message: 'Incorrect Template', success: false })
            }
            xlData.map(async (data: any, index: number) => {
                if (!data.schoolName || !data.schoolArea || !data.schoolCity || !data.pinCode || !data.contactName || !data.contactPhone || !data.contactEmail)
                    return res.status(403).json({ message: 'All fields are required', success: false })
                try {
                    const newSchool = new schoolModel({
                        schoolName: data.schoolName,
                        schoolAddress: {
                            schoolArea: data.schoolArea,
                            schoolCity: data.schoolCity,
                            pinCode: data.pinCode
                        },
                        contestPerson: {
                            contactName: data.contactName,
                            contactPhone: data.contactPhone,
                            contactEmail: data.contactEmail
                        },
                        sports: {
                            isCricket: data?.isCricket,
                            isTennis: data?.isTennis,
                            isFootball: data?.isFootball,
                            isBadminton: data?.isBadminton,
                            isBasketball: data?.isBasketball,
                            other: data?.other
                        }
                    })
                    // save the file into db
                    const isDone = await newSchool.save();
                    if (!isDone) return res.status(500).json({ message: 'Something went wrong', success: false })
                    return res.status(201).json({ message: xlData.length + ' records are saved', success: true })
                } catch (error: any) {
                    console.log(error)
                    // check the error code for duplicate email or phone number
                    if (error.code === 11000) return res.status(403).json({ message: 'Email or Phone number is already exists of ' + data.schoolName, success: false })
                    return res.status(500).json({ message: error.message, success: false })
                }
            })
            // delete the file after saving it into db
            removeFile(req?.file?.path)
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message, success: false })
    }
}

// employee register with file
const registerEmpWithFile = async (req: Request, res: Response) => {

    const permission = [
        {
            "role": "tl",
            "permision": Roles.tl
        },
        {
            "role": "superAdmin",
            "permision": Roles.superAdmin
        }
    ]

    const desireRole = (role: any) => {
        const roleIndex = permission.findIndex((item: any) => item.role === role)
        return permission[roleIndex].permision
    }

    try {
        // check if file is uploaded
        if (req.file === undefined) {
            return res.status(400).send("Please upload a exel file!");
        } else {
            // read exel file with only file whithout saving it
            const workbook = xlsx.readFile(req.file.path);
            const sheet_name_list = workbook.SheetNames;
            const xlData = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
            console.log('data', xlData)
            xlData.map(async (data: any, index: number) => {
                if (!data.id || !data.name || !data.email || !data.phone || !data.role)
                    return res.status(403).json({ message: 'All fields are required', success: false })
                // check the file format is valid or not
                if (!data.id) {
                    return res.status(403).json({ message: 'Incorrect Template', success: false })
                }
                try {
                    // conver the role into number
                    // const converRole = Roles.includes(data.role)
                    // generate password
                    const password = generatePassword()
                    const newEmp = new empModel({
                        id: data.id,
                        name: data.name,
                        email: data.email,
                        phone: data.phone,
                        role: desireRole(data.role),
                        password: password
                    })
                    // save the file into db
                    const isDone = await newEmp.save();
                    if (!isDone) return res.status(500).json({ message: 'Something went wrong', success: false })
                    return res.status(200).json({
                        message: xlData.length + ' records are saved', data: {
                            id: data.id,
                            password: password
                        }, success: true
                    })
                } catch (error: any) {
                    console.log(error)
                    // check the error code for duplicate email or phone number
                    if (error.code === 11000) return res.status(403).json({ message: 'ID or Phone number is already exists of ' + data.id, success: false })
                    return res.status(500).json({ message: error.message, success: false })
                }
            })
            // delete the file after saving it into db
            removeFile(req?.file?.path)
        }
    } catch (error: any) {
        console.log('error', error)
        res.status(500).json({ message: error.message, success: false })
    }
}



export default { registerSchoolWithFile, registerEmpWithFile };