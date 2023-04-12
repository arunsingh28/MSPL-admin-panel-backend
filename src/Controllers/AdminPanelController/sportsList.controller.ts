import { Request, Response } from "express";
import { sportsListDB } from "../../Models/sportsList.model";
import { deleteFile, uploadFile } from '../../services/aws.s3'



interface IUpload {
    location: string;
    key: string;
}


const saveSportsList = async (req: Request, res: Response) => {
    try {
        const upload = await uploadFile(req.file) as IUpload
        if (upload) {
            req.body.image = upload.location;
            req.body.key = upload.key;
        } else {
            deleteFile(req.body.key)
            return res.status(500).json({ message: 'Something went wrong', success: false, statusCode: res.statusCode });
        }
        const sportsList = await sportsListDB.create({
            name: req.body.name,
            image: {
                location: req.body.image,
                key: req.body.key
            }
        });
        res.status(200).json({ sportsList, success: true, statusCode: res.statusCode });
    } catch (error: any) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'This sportsList already exists', success: false, statusCode: res.statusCode });
        }
        res.status(500).json({ message: error.message, success: false, statusCode: res.statusCode });
    }
}

const updateSportsList = async (req: Request, res: Response) => {
    try {
        const upload = await uploadFile(req.file) as IUpload
        if (upload) {
            req.body.image = upload.location;
            req.body.key = upload.key;
        } else {
            deleteFile(req.body.key)
            return res.status(500).json({ message: 'Something went wrong', success: false, statusCode: res.statusCode });
        }
        const sportsList = await sportsListDB.findByIdAndUpdate(req.params.id, {
            $set: {
                name: req.body.name,
                image: {
                    location: req.body.image,
                    key: req.body.key
                }
            }
        }, { new: true });
        res.status(200).json({ sportsList, success: true, statusCode: res.statusCode });
    } catch (error: any) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'This sportsList already exists', success: false, statusCode: res.statusCode });
        }
        res.status(500).json({ message: error.message, success: false, statusCode: res.statusCode });
    }
}

const deleteSportsList = async (req: Request, res: Response) => {
    try {
        const sportsList = await sportsListDB.findByIdAndDelete(req.params.id);
        if (sportsList) {
            deleteFile(sportsList.image.key)
        }
        res.status(200).json({ sportsList, success: true, statusCode: res.statusCode });
    } catch (error: any) {
        res.status(500).json({ message: error.message, success: false, statusCode: res.statusCode });
    }
}



const sportsList = async (req: Request, res: Response) => {
    try {
        const sportsList = await sportsListDB.find();
        res.status(200).json({ sportsList });
    } catch (error) {
        res.status(500).json({ error });
    }
}


export default { sportsList, saveSportsList, updateSportsList, deleteSportsList }