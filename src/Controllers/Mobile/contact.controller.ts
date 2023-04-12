import { Request, Response } from "express";
import { contactModel } from "../../Models/contact.model";

const raseNewRequest = async (req: Request, res: Response) => {
    try {
        const data = await contactModel.create({
            subject: req.body.subject,
            message: req.body.message,
            from: req.params.id,
        });
        return res.status(200).json({ data, message: 'Query raised successfully', success: true });
    } catch (error: any) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};

const getContactRequests = async (req: Request, res: Response) => {
    try {
        const data = await contactModel.find({}).populate("from");
        return res.status(200).json({ data, message: 'Query raised successfully', success: true });
    } catch (error: any) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
}

export default { raseNewRequest }