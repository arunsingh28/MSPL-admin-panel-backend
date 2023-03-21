import { Request, Response } from 'express'
import recipeDB from '../../Models/Recipies.Model'


// form.append('name', recipeDate.name)
// form.append('ingredients', JSON.stringify(recipeDate.ingredients))
// form.append('tags', JSON.stringify(recipeDate.tags))
// form.append('preparationTime', JSON.stringify(recipeDate.preparationTime))
// form.append('status', JSON.stringify(recipeDate.status))
// form.append('sourceLink', recipeDate.sourceLink)
// form.append('nutritionName', recipeDate.nutritionName)
// form.append('file', recipeDate.image)


const saveNewRecipie = async (req: Request, res: Response) => {
    // parse the data
    const data = JSON.parse(req.body.data)
    // create object
    const recipe = {
        name: req.body.name,
        ingredients: data.ingredients,
        tags: data.tags,
        preparationTime: req.body.preparationTime,
        status: req.body.status,
        sourceLink: req.body.sourceLink,
        nutritionName: req.body.nutritionName,
        image: {
            location: 'location',
            key: 'key'
        }
    }

    try {
        await recipeDB.create(recipe)
        return res.status(201).json({ success: true, message: 'Recipi Save' })
    } catch (err: any) {
        return res.status(200).json({ message: err.message })
    }
}

const getRecipe = async (req: Request, res: Response) => {
    try {
        const recipe = await recipeDB.find({})
        return res.status(200).json({ success: true, recipe })
    } catch (err: any) {
        return res.status(200).json({ message: err.message })
    }
}

export default { saveNewRecipie, getRecipe } 
