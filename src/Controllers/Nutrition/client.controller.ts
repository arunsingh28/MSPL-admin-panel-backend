import { Request, Response } from "express";
import empDB from '../../Models/emp.model'


const fetchClient = async (req: Request, res: Response) => {
    const myClient = await empDB.findById(req.params.id).populate('myClient').exec()
    if (myClient) {
        return res.status(200).json({ success: true, myClient: myClient.myClient })
    }
    return res.status(404).json({ success: false, message: 'Nutrition not found' })
}

const attachClient = async (req: Request, res: Response) => {

}

const updateClient = async (req: Request, res: Response) => { }

const deleteClient = async (req: Request, res: Response) => { }




export default {
    fetchClient,
    attachClient,
    updateClient,
    deleteClient
}
