import { Request, Response } from "express";
import addMealDB from "../../Models/AddMeal/addMeal.model";

export const addMeal = async (req: Request, res: Response) => {
    const { recipeId, date, time, calories } = req.body;
    if (!recipeId || !date || !time || !calories) return res.status(400).json({ message: 'Please fill all the fields', success: false, statusCode: 400 });
    const newMeal = new addMealDB({
        recipeId,
        date,
        time,
        recipe: req.body.recipe,
        calories,
    });
    try {
        const savedMeal = await newMeal.save();
        res.status(200).json({ message: 'Meal added successfully', savedMeal, success: true, statusCode: 200 });
    } catch (err: any) {
        res.status(500).json({ message: 'Something went wrong', err: err.message, success: false, statusCode: 500 });
    }
}
