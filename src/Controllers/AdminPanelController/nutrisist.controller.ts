import { Request, Response } from "express";
import empDB from '../../Models/emp.model';
import { uploadFile, deleteFile } from '../../services/aws.s3'

interface IUpload {
    location: string;
    key: string;
}

const updateProfile = async (req: Request, res: Response) => {
    const data = JSON.parse(req.body.data)
    const file = req.file
    console.log('data', data.change)
    console.log('file', data.education)
    if (data.change) {
        // profile change
        try {
            // delete old profile from the aws s3
            await deleteFile(data.key)
            const isUpload = await uploadFile(file) as IUpload
            if (isUpload) {
                const update = {
                    profile: {
                        profileImage: {
                            location: isUpload.location,
                            key: isUpload.key
                        },
                        bio: data.bio,
                        experience: parseInt(data.exprience),
                        language: data.language,
                        education: data.education,
                        specialisation: data.specialist,
                    }
                }
                // qualification: data.qualification,

                try {
                    const isDone = await empDB.findByIdAndUpdate(req.params.id, {
                        $set: update
                    }).exec()
                    console.log('isDone', isDone)
                    if (isDone) {
                        return res.status(200).json({ success: true, message: 'Profile Updated' })
                    }
                } catch (error) {
                    console.log('error', error)
                    return res.status(404).json({ success: false, message: 'Profile not Updated' })
                }
            }
        } catch (err: any) {
            console.log('error 1', err)
            return res.status(500).json({ message: err.message, success: false })
        }
    } else {
        // profile not change
        try {
            const update = {
                profile: {
                    experience: parseInt(data.exprience),
                    language: data.language,
                    specialisation: data.specialist,
                    education: data.education,
                    bio: data.bio,
                    profileImage: {
                        location: data.image.location,
                        key: data.image.key
                    }
                }
            }
            // qualification: data.qualification,

            try {
                const isDone = await empDB.findByIdAndUpdate(req.params.id, {
                    $set: update
                }).exec()
                console.log('isDone', isDone)
                if (isDone) {
                    return res.status(200).json({ success: true, message: 'Profile Updated' })
                }
            } catch (error) {
                console.log('error', error)
                return res.status(404).json({ success: false, message: 'Profile not Updated' })
            }
        } catch (err: any) {
            console.log('error 1', err)
            return res.status(500).json({ message: err.message, success: false })
        }
    }
}


// send the nutriotn profile
const getNutritionProfile = async (req: Request, res: Response) => {
    try {
        const isNutrition = await empDB.findById(req.params.id).exec()
        if (isNutrition) {
            return res.status(200).json({ success: true, profile: isNutrition.profile })
        } else {
            return res.status(404).json({ success: false, message: 'Nutrition not found' })
        }
    } catch (err: any) {
        return res.status(500).json({ message: err.message, success: false })
    }
}

// remove image
const removeImage = async (req: Request, res: Response) => {
    try {
        const isDeleted = await deleteFile(req.params.key)
        if (isDeleted) {
            // remove the image from the database
            let temp = await empDB.findById(req.params.id).exec();

            const isDone = await empDB.findByIdAndUpdate(req.params.id, {
                $set: {
                    profile: {
                        profileImage: {
                            location: '',
                            key: ''
                        },
                        bio: temp?.profile.bio,
                        experience: temp?.profile.experience,
                        language: temp?.profile.language,
                        specialisation: temp?.profile.specialisation,
                        education: temp?.profile.education,
                    }
                }
            }).exec()
            if (!isDone) return res.status(404).json({ success: false, message: 'Image not Deleted' })
            return res.status(200).json({ success: true, message: 'Image Deleted' })
        }
    } catch (err: any) {
        return res.status(500).json({ message: err.message, success: false })
    }
}


const dietPlanner = async (req: Request, res: Response) => {
    console.log('id', req.params.id)
    console.log('req.body', JSON.stringify(req.body))
}

export default { updateProfile, getNutritionProfile, removeImage, dietPlanner } 