import { Request, Response } from 'express'
import recipeDB from '../../Models/recipies.model'
import { uploadFile, deleteFile } from '../../services/aws.s3'



const saveNewRecipie = async (req: Request, res: Response) => {
    // parse the data
    const data = JSON.parse(req.body.data)

    const upload: any = await uploadFile(req.file)
    console.log({ upload })
    // create object
    const recipe = {
        name: data.name,
        ingredients: data.ingredients,
        tags: data.tags,
        preparationTime: data.preparationTime,
        status: data.status,
        sourceLink: data.sourceLink,
        nutritionName: data.nutritionName,
        image: {
            location: upload.location,
            key: upload.key
        }
    }

    try {
        await recipeDB.create(recipe)
        return res.status(201).json({ success: true, message: 'Recipi Save' })
    } catch (err: any) {
        return res.status(200).json({ message: err.message, success: false })
    }
}

const getRecipe = async (req: Request, res: Response) => {
    try {
        const recipe = await recipeDB.find({})
        return res.status(200).json({ success: true, recipe })
    } catch (err: any) {
        return res.status(200).json({ message: err.message, success: false })
    }
}

// delete recipe
const deleteRecipe = async (req: Request, res: Response) => {
    try {
        const isRecipe: any = await recipeDB.findById(req.params.id).exec()
        const isDelete = await deleteFile(isRecipe?.image.key)
        if (isDelete) {
            await recipeDB.findByIdAndDelete(req.params.id)
            return res.status(200).json({ success: true, message: 'Recipe Deleted' })
        } else {
            return res.status(401).json({ success: false, message: 'Error in deleting file' })
        }
    } catch (err: any) {
        return res.status(200).json({ message: err.message, success: false })
    }
}

// send recipe by id
const getRecipeById = async (req: Request, res: Response) => {
    try {
        const recipe = await recipeDB.findById(req.params.id)
        return res.status(200).json({ success: true, recipe })
    } catch (err: any) {
        return res.status(200).json({ message: err.message, success: false })
    }
}

const updateRecipe = async (req: Request, res: Response) => {
    // parse the data
    const data = JSON.parse(req.body.data)
    let upload: any;
    const isNewImg = req.body.isNewFile === 'true' ? true : false
    const isRecipe = await recipeDB.findById(req.body.id).exec()
    if (!isNewImg) {
        const recipe = {
            name: data.name,
            ingredients: data.ingredients,
            tags: data.tags,
            preparationTime: data.preparationTime,
            status: data.status,
            sourceLink: data.sourceLink,
            nutritionName: data.nutritionName,
            image: {
                location: isRecipe?.image.location,
                key: isRecipe?.image.key
            }
        }
        try {
            await recipeDB.findByIdAndUpdate(req.body.id, { recipe }).exec()
            return res.status(201).json({ success: true, message: 'Recipi Updated true' })
        } catch (err: any) {
            return res.status(200).json({ message: err.message, success: false })
        }
    } else {
        upload = await uploadFile(req.file)
        const isDelete = await deleteFile(req.body.key)
        if (!isDelete) return res.status(200).json({ message: 'Error in updating file', success: false })

        const recipe = {
            name: data.name,
            ingredients: data.ingredients,
            tags: data.tags,
            preparationTime: data.preparationTime,
            status: data.status,
            sourceLink: data.sourceLink,
            nutritionName: data.nutritionName,
            image: {
                location: upload.location,
                key: upload.key
            }
        }
        try {
            await recipeDB.findByIdAndUpdate(req.body.id, recipe)
            return res.status(201).json({ success: true, message: 'Recipi Updated' })
        } catch (err: any) {
            return res.status(200).json({ message: err.message, success: false })
        }
    }

}


export default { saveNewRecipie, getRecipe, deleteRecipe, getRecipeById, updateRecipe } 
