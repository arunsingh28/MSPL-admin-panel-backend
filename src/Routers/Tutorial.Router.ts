import express, { Router } from 'express'
import lmsController from '../Controllers/LMS/lms.controller'
import multer from 'multer'


const router = express.Router()


const storage = multer.memoryStorage()

const upload = multer({ storage, limits: { fileSize: 1024 * 1024 * 10 } }) // 10 MB


router.route('/init-course').post(upload.single('file'), lmsController.saveModuleName)


router.route('/update-course/:id').put(lmsController.updateModuleName)
router.route('/delete-course/:id').delete(lmsController.deleteModuleName)
router.route('/get-all-course').get(lmsController.getAllModules)
router.route('/fetch-course/:id').get(lmsController.getModuleById)
router.route('/fetch-modules/:id').get(lmsController.sendModules)


// lesson
router.route('/update-lesson/:id').post(upload.single('file'), lmsController.updateLesson)


// pdf upload
router.route('/upload-pdf-course/:id').post(upload.single('pdf'), lmsController.uploadPDF)



export default router

