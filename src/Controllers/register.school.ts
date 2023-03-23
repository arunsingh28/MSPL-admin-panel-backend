import { Request, Response } from 'express';
import schoolModel from '../Models/school.model';

const registerForSchool = async (req: Request, res: Response) => {
    const { schoolName, schoolArea, schoolCity, pinCode, contactName, contactPhone, contactEmail,cricket:isCricket, tennis: isTennis, isFootball,badminton:isBadminton,basketball:isBasketball,otherSport:other } = req.body;
    // value validation
    if(!schoolName || !schoolArea || !schoolCity || !pinCode || !contactName || !contactPhone || !contactEmail) 
    return res.status(403).json({ message: 'All fields are required', sucess: false })
    try {
        const newSchool = new schoolModel({
            schoolName,
            schoolAddress: { schoolArea, schoolCity, pinCode },
            contestPerson: { contactName, contactPhone, contactEmail },
            sports: { isCricket, isTennis, isFootball, isBadminton, isBasketball, other }
        })
        // save the data into db
        const isDone = await newSchool.save();
        if (!isDone) return res.status(500).json({ message: 'Something went wrong', sucess: false })
        return res.status(200).json({ message: `${schoolName} is Created Succssfully.`, sucess: true })
    } catch (error: any) {
        console.log(error)
        // check the error code for duplicate email or phone number
        if(error.code === 11000) return res.status(403).json({ message: 'Email or Phone number is already exists.', sucess: false })
        return res.status(500).json({ message: error.message, sucess: false })
    }
}

export default { registerForSchool };