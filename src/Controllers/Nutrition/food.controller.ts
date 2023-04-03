import { Request, Response } from "express";
import { ingridienentsModel } from "../../Models/ingridienents.model";
import recipeCategoryModel from "../../Models/recipiCategory.model";
import DietFrequencyModel from "../../Models/dietFrequency.model";
import xlsx from 'xlsx'
import Pdfparser from "pdf2json";
import pdf from 'pdf-parse'

import fs from 'fs'

const addIngridientWithFile = async (req: Request, res: Response) => {
    // save the ingridient to the database from file

    // const dataBuffer = fs.readFileSync((req.file as any).path)
    // pdf(dataBuffer).then((data: any) => {
    //     console.log('pdf', data.text)
    // })


    if (req.file?.originalname.split('.').pop() !== 'xlsx') {
        // remove the file from server
        fs.unlinkSync((req as any).file.path)
        return res.status(400).json({ message: 'Please select file with xlsx format' })
    }
    if (req.file === undefined) {
        // remove the file from server
        fs.unlinkSync((req as any).file.path)
        return res.status(400).json({ message: 'Please select file' })
    }
    try {
        const workbook = xlsx.readFile(req.file.path);
        const sheet_name_list = workbook.SheetNames;
        const xlData: any = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
        if (xlData[0].name === undefined || xlData[0].unit === undefined || xlData[0].quantity === undefined || xlData[0].calories === undefined || xlData[0].protien === undefined || xlData[0].fat === undefined || xlData[0].carb === undefined) {
            fs.unlinkSync(req.file.path)
            return res.status(400).json({ message: 'Require filed are missing use downloaded template', success: false })
        }
        let i = 0
        let count = 0
        while (i < xlData.length) {
            count++
            const isInsert = await ingridienentsModel.create({
                name: xlData[i].name,
                unit: xlData[i].unit,
                quantity: xlData[i].quantity,
                calories: xlData[i].calories,
                protein: xlData[i].protien,
                fat: xlData[i].fat,
                carbs: xlData[i].carb,
            })
            i++
        }
        fs.unlinkSync(req.file.path)
        return res.status(200).json({ message: count + ' records are inserted', success: true })
    } catch (error: any) {
        // remove file from server
        fs.unlinkSync(req.file.path)
        return res.status(500).json({ message: 'Internal server error', success: false })
    }
}

const addIngridient = async (req: Request, res: Response) => {
    // save the ingridient to the database
    try {
        const isInsert = await ingridienentsModel.create({
            name: req.body.name,
            unit: req.body.unit,
            quantity: req.body.quantity,
            calories: req.body.calories,
            protein: req.body.protein,
            fat: req.body.fat,
            carbs: req.body.carbs,
        })
        return res.status(200).json({ message: req.body.name + ' is inserted', success: true })
    } catch (error: any) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error', success: false })
    }
}

// fetch all ingridients
const sendIngridients = async (req: Request, res: Response) => {
    try {
        const data = await ingridienentsModel.find({})
        return res.status(200).json({ data, success: true })
    } catch (error: any) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error', success: false })
    }
}

const recipieCategory = async (req: Request, res: Response) => {
    // save the ingridient to the database
    try {
        await recipeCategoryModel.create({
            name: req.body.name,
        })
        return res.status(200).json({ message: req.body.name + ' is added', success: true })
    } catch (error: any) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Category already exist', success: false })
        }
        return res.status(500).json({ message: 'Internal server error', success: false })
    }
}

const sendrecipieCategory = async (req: Request, res: Response) => {
    // save the ingridient to the database
    try {
        const data = await recipeCategoryModel.find({})
        return res.status(200).json({ data, success: true })
    } catch (error: any) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error', success: false })
    }
}

const deleteRecipeCategory = async (req: Request, res: Response) => {
    try {
        await recipeCategoryModel.deleteOne({ _id: req.params.id })
        return res.status(200).json({ success: true, message: 'Delete successfully' })
    } catch (error: any) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error', success: false })
    }
}

const updateRecipeCategory = async (req: Request, res: Response) => {
    try {
        await recipeCategoryModel.updateOne({ _id: req.params.id }, { $set: { name: req.body.name } })
        const data = await recipeCategoryModel.find({})
        return res.status(200).json({ success: true, data, message: 'Update successfully' })
    } catch (error: any) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Category already exist', success: false })
        }
        return res.status(500).json({ message: 'Internal server error', success: false })
    }
}

// save the diet frequency
const addDietFrequency = async (req: Request, res: Response) => {
    // save the ingridient to the database
    try {
        await DietFrequencyModel.create({
            name: req.body.name,
        })
        return res.status(200).json({ message: req.body.name + ' is added', success: true })
    } catch (error: any) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Diet already exist', success: false })
        }
        return res.status(500).json({ message: 'Internal server error', success: false })
    }
}

// send all the deit frequency
const sendDietFrequency = async (req: Request, res: Response) => {
    // save the ingridient to the database
    try {
        const data = await DietFrequencyModel.find({})
        return res.status(200).json({ data, success: true })
    } catch (error: any) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error', success: false })
    }
}

// delte the diet frequency
const deleteDietFrequency = async (req: Request, res: Response) => {
    try {
        await DietFrequencyModel.deleteOne({ _id: req.params.id })
        return res.status(200).json({ success: true, message: 'Delete successfully' })
    } catch (error: any) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error', success: false })
    }
}

// update the diet frequency
const updateDietFrequency = async (req: Request, res: Response) => {
    try {
        await DietFrequencyModel.updateOne({ _id: req.params.id }, { $set: { name: req.body.name } })
        const data = await DietFrequencyModel.find({})
        return res.status(200).json({ success: true, data, message: 'Update successfully' })
    } catch (error: any) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Diet already exist', success: false })
        }
        return res.status(500).json({ message: 'Internal server error', success: false })
    }
}

const deleteIngridients = async (req: Request, res: Response) => {
    try {
        const isDelete = await ingridienentsModel.findOneAndDelete({ _id: req.params.id }).exec()
        if (isDelete) {
            return res.status(200).json({ success: true, message: 'Delete successfully' })
        }
    } catch (err: any) {
        return res.status(500).json({ message: 'Internal server error', error: err.message, success: false })
    }
}

export default {
    addIngridientWithFile, addIngridient, deleteIngridients,
    recipieCategory, sendrecipieCategory, sendIngridients,
    deleteRecipeCategory, updateRecipeCategory, updateDietFrequency,
    addDietFrequency, sendDietFrequency, deleteDietFrequency
}