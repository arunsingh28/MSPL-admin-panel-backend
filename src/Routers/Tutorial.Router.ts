import express, { Router } from 'express'
import lmsController from '../Controllers/LMS/lms.controller'

const router = express.Router()


router.route('/init-course').post(lmsController.saveModuleName)
router.route('/update-course/:id').put(lmsController.updateModuleName)
router.route('/get-all-course').get(lmsController.getAllModules)
router.route('/fetch-course/:id').get(lmsController.getModuleById)
router.route('/fetch-modules/:id').get(lmsController.sendModules)
router.route('/update-lesson/:id').put(lmsController.updateLesson)



export default router

