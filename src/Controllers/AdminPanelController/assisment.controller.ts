import { Request, Response } from 'express'
import atheleteAssismentDB from '../../Models/AssismentForm/Athelete.model'
import mongoose from 'mongoose'

const addIntroduction = async (req: Request, res: Response) => {
    const isExist = await atheleteAssismentDB.findOne({ client: req.body.client })
    if (isExist) return res.status(403).json({ message: 'Introduction already added', success: false })
    try {
        const newIntroduction = await atheleteAssismentDB.create({
            INTRODUCTION: { ...req.body },
            client: req.body.Client,
        })
        if (!newIntroduction) return res.status(500).json({ message: 'Something went wrong', success: false })
        return res.status(200).json({ message: 'Introduction added successfully', success: true })
    } catch (error: any) {
        console.log(error)
        return res.status(500).json({ message: error.message, success: false })
    }
}

const getAssessmentForm = async (req: Request, res: Response) => {
    // convert ClientId to ObjectId
    const client = req.params.id as any
    const assessmentForm = await atheleteAssismentDB.findOne({ client }).exec()
    if (!assessmentForm) return res.status(403).json({ message: 'Please add introduction first', success: false })
    return res.status(200).json({ success: true, assessmentForm })
}


const addMeasurement = async (req: Request, res: Response) => {
    const assessmentForm = await atheleteAssismentDB.findOne({ client: req.body.Client })
    if (!assessmentForm) return res.status(403).json({ message: 'Please add introduction first', success: false })
    try {
        assessmentForm.ANTHROPOMETRY = { ...req.body }
        const updatedForm = await assessmentForm.save()
        if (!updatedForm) return res.status(500).json({ message: 'Something went wrong', success: false })
        return res.status(200).json({ message: 'Measurement added successfully', success: true })
    } catch (error: any) {
        console.log(error)
        return res.status(500).json({ message: error.message, success: false })
    }
}


const saveMedicalHistory = async (req: Request, res: Response) => {
    const assessmentForm = await atheleteAssismentDB.findOne({ client: req.body.Client }).exec()
    if (!assessmentForm) return res.status(403).json({ message: 'Please add introduction first', success: false })
    try {
        assessmentForm.MEDICAL_HISTORY = { ...req.body }
        const updatedForm = await assessmentForm.save()
        if (!updatedForm) return res.status(500).json({ message: 'Something went wrong', success: false })
        return res.status(200).json({ message: 'Medical history added successfully', success: true })
    }
    catch (error: any) {
        console.log(error)
        return res.status(500).json({ message: error.message, success: false })
    }
}


const saveLifestyleHabits = async (req: Request, res: Response) => {
    const assessmentForm = await atheleteAssismentDB.findOne({ client: req.body.Client }).exec()
    if (!assessmentForm) return res.status(403).json({ message: 'Please add introduction first', success: false })
    try {
        assessmentForm.FOOD_LIFESTYLE_HABITS = { ...req.body }
        const updatedForm = await assessmentForm.save()
        if (!updatedForm) return res.status(500).json({ message: 'Something went wrong', success: false })
        return res.status(200).json({ message: 'Lifestyle habits added successfully', success: true })
    }
    catch (error: any) {
        console.log(error)
        return res.status(500).json({ message: error.message, success: false })
    }
}


const saveFoodRecall = async (req: Request, res: Response) => {
    const assessmentForm = await atheleteAssismentDB.findOne({ client: req.body.Client }).exec()
    if (!assessmentForm) return res.status(403).json({ message: 'Please add introduction first', success: false })
    try {
        assessmentForm.FOOD_RECALL = {
            FoodFrequency: req.body.foodFrequency,
            Meals: req.body.mealStyle,
        }
        const updatedForm = await assessmentForm.save()
        if (!updatedForm) return res.status(500).json({ message: 'Something went wrong', success: false })
        return res.status(200).json({ message: 'Food recall added successfully', success: true })
    } catch (error: any) {
        console.log(error)
        return res.status(500).json({ message: error.message, success: false })
    }
}


const saveSummary = async (req: Request, res: Response) => {
    console.log(req.body)
    const assessmentForm = await atheleteAssismentDB.findOne({ client: req.body.Client }).exec()
    if (!assessmentForm) return res.status(403).json({ message: 'Please add introduction first', success: false })
    try {
        assessmentForm.SUMMARY = { 
            ...req.body,
         }
        const updatedForm = await assessmentForm.save()
        if (!updatedForm) return res.status(500).json({ message: 'Something went wrong', success: false })
        return res.status(200).json({ message: 'Summary added successfully', success: true })
    } catch (error: any) {
        console.log(error)
        return res.status(500).json({ message: error.message, success: false })
    }
}

export default {
    addIntroduction, addMeasurement,
    getAssessmentForm, saveSummary, saveMedicalHistory,
    saveLifestyleHabits, saveFoodRecall
}