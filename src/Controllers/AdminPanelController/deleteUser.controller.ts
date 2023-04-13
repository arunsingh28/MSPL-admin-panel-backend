import { Request, Response } from "express";
import userDB from '../../Models/user.model';


const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await userDB.findByIdAndDelete(req.params.id);
        if (!user) return res.status(400).json({ message: "User not found", success: false });
        return res.status(200).json({ message: "User deleted successfully", success: true });
    } catch (error: any) {
        return res.status(500).json({ message: error.message, success: false });
    }
}

export default { deleteUser };