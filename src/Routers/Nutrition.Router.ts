import express from 'express'
import multer from 'multer'
import saveNewRecipie from '../Controllers/Nutrition/Recipies.controller'
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

router.route('/save-recipie').post(upload.single('file'), saveNewRecipie.saveNewRecipie)

export default router