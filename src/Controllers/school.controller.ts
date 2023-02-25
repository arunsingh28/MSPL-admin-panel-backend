import { Request, Response } from 'express';
import schoolModel from '../Models/school.model';

const getAllSchool = async (req: Request, res: Response) => {
    const school = await schoolModel.find();
    if (!school) return res.status(404).json({ message: 'No school found' })
    return res.status(200).json({ school });
}

const schoolStatCount = async (req: Request, res: Response) => {
    const schoolCount = await schoolModel.countDocuments();
    return res.status(200).json({ schoolCount });
}

const schoolDelete = async (req: Request, res: Response) => {
    const school = await schoolModel.findByIdAndDelete(req.params.id);
    if (!school) return res.status(404).json({ message: 'No school found' })
    return res.status(200).json({ school });
}

const searchSchool = async (req: Request, res: Response) => {
    // send similar school with city name from database
    if (req.body.city === '' || req.body.schoolName) {
        const school = await schoolModel.find({ schoolName: { $regex: req.body.schoolName, $options: 'i' } });
        return res.status(200).json({ school });
    }
}

const schoolViewById = async (req: Request, res: Response) => {
    const school = await schoolModel.findById(req.params.id);
    if (!school) return res.status(404).json({ message: 'No school found' })
    return res.status(200).json({ school });
}

export default { getAllSchool, schoolStatCount, schoolDelete, searchSchool, schoolViewById };

