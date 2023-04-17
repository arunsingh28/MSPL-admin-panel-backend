import { Request, Response } from "express";
import DietPlanModel from "../../Models/dietPlan.model";

const createDietPlan = async (req: Request, res: Response) => {
    try {
        const { recipe, userId } = req.body;
        const dietPlan = await DietPlanModel.create({
            mealPlan: [
                {
                    weekPlan: recipe
                }
            ],
            client: userId
        });
        res.status(201).json({
            status: "success",
            data: dietPlan,
            message: 'Diet plan save successfully'
        });
    } catch (error: any) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
}

export default createDietPlan;