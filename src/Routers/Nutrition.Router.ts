import express from 'express'
import multer from 'multer'
import foodController from '../Controllers/Nutrition/food.controller'
const router = express.Router()


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname + "../../../" + "Nutrition/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-bulk-${file.originalname}`);
    },
});

const upload = multer({ storage })

// router.route('/add-ingridienents').post(upload.single('file'), foodController.addIngridient)

export default router