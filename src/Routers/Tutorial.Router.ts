import express, { Request, Response } from 'express'
import tutorialController from '../Controllers/tutorial.LMS'
const router = express.Router()

router.route('/get-info').get(tutorialController.getTutorialInfo)
router.route('/init').post(tutorialController.initTutorial)
router.route('/init-module').post(tutorialController.initModule)
router.route('/init-module-name').post(tutorialController.initModuleName)


export default router

