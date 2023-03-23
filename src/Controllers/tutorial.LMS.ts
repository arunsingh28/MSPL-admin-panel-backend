import { Request, Response } from 'express'
import { Tutorial } from '../Models/Tutorial.LMS'
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
    const { name, description } = req.body
    const userId = await req.session.user?._id
    // console.log(req.user)
    if (!name || !description) {
        return res.status(400).json({ message: 'All fields are required', success: false })
    }
    try {
        const isExits = await Tutorial.findOne({ TutorialTitle: name })
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
            TutorialTitle: name,
            intiater: userId,
            TutorialDescription: description
        })
        await tutorial.save()
        return res.status(201).json({ message: 'Tutorial Initiate Successfully', success: true })
    } catch (error: any) {
        return res.status(500).json({ message: error.message, success: false })
    }
}

const initModule = async (req: Request, res: Response) => {
    const { modules, name } = req.body
    const userId = await req.session.user?._id
    if (!modules || !name) {
        return res.status(400).json({ message: 'All fields are required', success: false })
    }
    try {
        const tutorial = await Tutorial.findOne({ TutorialTitle: name })
        const emp = await empModel.findById(userId).exec()
        if (emp) {
            emp.tutorialTimeline.createModule = false
            emp.tutorialTimeline.nameModule = true
            await emp.save()
        }
        if (!tutorial) {
            return res.status(404).json({ message: 'Tutorial not found', success: false })
        }
        tutorial.moduleNumber = modules
        await tutorial.save()
        return res.status(201).json({ message: modules + ' Module Initiate Successfully', success: true })
    } catch (error: any) {
        return res.status(500).json({ message: error.message, success: false })
    }
}

const initModuleName = async (req: Request, res: Response) => {
    const { name, moduleName, moduleDescription } = req.body
    const userId = await req.session.user?._id
    if (!name || !moduleName || !moduleDescription) {
        return res.status(400).json({ message: 'All fields are required', success: false })
    }
    try {
        const tutorial = await Tutorial.findOne({ TutorialTitle: name })
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
            Object.keys(moduleName).map((name: any) => {
                reject(tutorial.module.push({
                    moduleTitle: moduleName[name],
                    moduleDescription: moduleDescription[name]
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

