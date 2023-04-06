import { Request, Response } from 'express'
import { Tutorial } from '../Models/tutorial.lms'
import empModel from '../Models/emp.model'


// get info
const getTutorialInfo = async (req: Request, res: Response) => {
    const userId = await req.session.user?._id
    try {
        const info = await empModel.findById(userId).exec()
        const tutorial = await Tutorial.findOne({ intiater: userId }).exec()
        return res.status(200).json({ info: info?.tutorialTimeline, tutorial, success: false })
    } catch (error: any) {
        return res.status(500).json({ message: error.message, success: false })
    }
}

const initTutorial = async (req: Request, res: Response) => {
    const userId = await req.session.user?._id
    // console.log(req.user)
    if (!req.body.name || !req.body.description) {
        return res.status(400).json({ message: 'All fields are required', success: false })
    }
    try {
        const isExits = await Tutorial.findOne({ TutorialTitle: req.body.name })
        if (isExits) {
            return res.status(400).json({ message: 'Tutorial already exists', success: false })
        }
        // update user tutorialTimeline initTutorial to true
        const emp = await empModel.findById(userId).exec()
        if (emp) {
            emp.tutorialTimeline.initTutorial = false
            emp.tutorialTimeline.createModule = true
            await emp.save()
        }
        const tutorial = new Tutorial({
            TutorialTitle: req.body.name,
            intiater: userId,
            TutorialDescription: req.body.description
        })
        await tutorial.save()
        return res.status(201).json({ message: 'Tutorial Initiate Successfully', success: true })
    } catch (error: any) {
        return res.status(500).json({ message: error.message, success: false })
    }
}

const initModule = async (req: Request, res: Response) => {
    const userId = await req.session.user?._id
    if (!req.body.modules || !req.body.name) {
        return res.status(400).json({ message: 'All fields are required', success: false })
    }
    try {
        const tutorial = await Tutorial.findOne({ TutorialTitle: req.body.name })
        const emp = await empModel.findById(userId).exec()
        if (emp) {
            emp.tutorialTimeline.createModule = false
            emp.tutorialTimeline.nameModule = true
            await emp.save()
        }
        if (!tutorial) {
            return res.status(404).json({ message: 'Tutorial not found', success: false })
        }
        tutorial.moduleNumber = req.body.modules
        await tutorial.save()
        return res.status(201).json({ message: req.body.modules + ' Module Initiate Successfully', success: true })
    } catch (error: any) {
        return res.status(500).json({ message: error.message, success: false })
    }
}

const initModuleName = async (req: Request, res: Response) => {
    const userId = await req.session.user?._id
    if (!req.body.name || !req.body.moduleName || !req.body.moduleDescription) {
        return res.status(400).json({ message: 'All fields are required', success: false })
    }
    try {
        const tutorial = await Tutorial.findOne({ TutorialTitle: req.body.name })
        const emp = await empModel.findById(userId).exec()
        if (emp) {
            emp.tutorialTimeline.nameModule = false
            emp.tutorialTimeline.designModule = true
            await emp.save()
        }
        if (!tutorial) {
            return res.status(404).json({ message: 'Tutorial not found', success: false })
        }
        const intoDB = new Promise((resolve, reject) => {
            Object.keys(req.body.moduleName).map((name: any) => {
                reject(tutorial.module.push({
                    moduleTitle: req.body.moduleName[name],
                    moduleDescription: req.body.moduleDescription[name]
                }))
            })
            resolve(tutorial.save())
        })
        await intoDB.then(() => {
            return res.status(201).json({ message: 'Module Named Successfully', success: true })
        }).catch((error: any) => {
            return res.status(500).json({ message: error.message, success: false })
        })
    } catch (error: any) {
        return res.status(500).json({ message: error.message, success: false })
    }
}


const tutorialComplete = async (req: Request, res: Response) => {
    const userId = await req.session.user?._id
    try {
        const emp = await empModel.findById(userId).exec()
        if (emp) {
            emp.tutorialTimeline.initTutorial = true
            emp.tutorialTimeline.createModule = false
            emp.tutorialTimeline.nameModule = false
            emp.tutorialTimeline.designModule = false
            emp.tutorialTimeline.writeModule = false
            await emp.save()
            return res.status(201).json({ message: 'Tutorial Complete Successfully', success: true })
        }
    } catch (error: any) {
        return res.status(500).json({ message: error.message, success: false })
    }
}

export default { initTutorial, initModule, initModuleName, getTutorialInfo, tutorialComplete }

