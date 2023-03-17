import express from 'express'
import logout from '../Controllers/logout'
import schoolController from '../Controllers/school.controller'
import registerForSchool from '../Controllers/register.school'
import loginController from '../Controllers/login.controller'
import soundController from '../Controllers/sound.controller'
import multer from 'multer'
import regsiterWithFileController from '../Controllers/registerWithFile'
import academyController from '../Controllers/academy.controller'
import endUserController from '../Controllers/endUserController/endUser.controller'
import foodController from '../Controllers/Nutrition/food.controller'

const router = express.Router()

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname + "../../" + "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-bulk-${file.originalname}`);
    },
});

const upload = multer({ storage })

// school apis
router.route('/create-school').post(registerForSchool.registerForSchool)
router.route('/get-all-school').get(schoolController.getAllSchool)
router.route('/school-count').get(schoolController.schoolStatCount)
router.route('/delete-school/:id').delete(schoolController.schoolDelete)
router.route('/search-school').post(schoolController.searchSchool)
router.route('/get-school/:id').get(schoolController.schoolViewById)
router.route('/create-school-from-file').post(upload.single('file'), regsiterWithFileController.registerSchoolWithFile)


// admin panel apis
router.route('/verify-token/:token').get(loginController.verifyLogin)
router.route('/change-password/:_id').post(loginController.changePassword)
router.route('/sound-change/:_id').post(soundController.updateSoundSetting)
router.route('/sound-change/grab/:_id').get(soundController.sendSoundSetting)
router.route('/create-emp-from-file').post(upload.single('file'), regsiterWithFileController.registerEmpWithFile)
router.route('/logout').get(logout)

// user
router.route('/get-all-user').get(endUserController.getAllUsers)
router.route('/get-user-info/:id').get(endUserController.getUserById)

// academy apis
router.route('/create-academy').post(academyController.registerAcademy)
router.route('/create-coache').post(academyController.createCoach)


router.route('/create-ingridient-from-file').post(upload.single('file'), foodController.addIngridientWithFile)
router.route('/create-ingridient').post(foodController.addIngridient)
router.route('/create-recipe-category').post(foodController.recipieCategory)
router.route('/fetch-recipie-category').get(foodController.sendrecipieCategory)
router.route('/delete-recipe-category/:id').delete(foodController.deleteRecipeCategory)
router.route('/update-recipe-category/:id').put(foodController.updateRecipeCategory)

export default router 