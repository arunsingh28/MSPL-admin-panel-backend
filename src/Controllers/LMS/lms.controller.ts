import { Request, Response } from "express";
import courseModel from "../../Models/course.model";


const saveModuleName = async (req: Request, res: Response) => {
    const { courseDescription, courseTitle } = req.body
    try {
        const course = await courseModel.create({
            courseTitle,
            courseDescription
        })
        res.status(200).json({ success: true, data: course })
    } catch (err: any) {
        console.log(err)
        if (err.code === 11000) {
            return res.status(400).json({ success: false, message: 'Module name already exists' })
        }
        res.status(500).json({ success: false, message: err.message })
    }
}

// send the all modules
const getAllModules = async (req: Request, res: Response) => {
    try {
        const course = await courseModel.find()
        res.status(200).json({ success: true, data: course })
    } catch (err: any) {
        res.status(500).json({ success: false, message: err.message })
    }
}

const getModuleById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const course = await courseModel.findById(id)
        res.status(200).json({ success: true, data: course })
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message })
    }
}

// udpate the module name
const updateModuleName = async (req: Request, res: Response) => {
    try {
        const { name } = req.body
        const course = await courseModel.findByIdAndUpdate(req.params.id, {
            moduleNames: name
        })
        res.status(200).json({ success: true, data: course })
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message })
    }
}

const sendModules = async (req: Request, res: Response) => {
    try {
        const course = await courseModel.findById(req.params.id).select('moduleNames').lean()
        console.log(course)
        res.status(200).json({ success: true, data: course })
    } catch (err: any) {
        res.status(500).json({ success: false, message: err.message })
    }
}



const updateLesson = async (req: Request, res: Response) => {
    try {
        const { lessonName, lessonContent } = req.body
        const course = await courseModel.findByIdAndUpdate(req.params.id, {
            $push: {
                lessons: [
                    {
                        lessonName: lessonName,
                        lessonContent: lessonContent
                    }
                ]
            }
        })
        res.status(200).json({ success: true, data: course })
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message })
    }
}

const shareCourse = async (req: Request, res: Response) => {
    try {
        const course = await courseModel.find({}).exec()
        res.status(200).json({ success: true, data: course })
    } catch (err: any) {
        res.status(500).json({ success: false, message: err.message })
    }
}


export default { saveModuleName, getAllModules, getModuleById, updateModuleName, sendModules, shareCourse, updateLesson }