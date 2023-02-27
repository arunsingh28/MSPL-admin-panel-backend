import express from 'express'
import logout from '../Controllers/logout'
import schoolController from '../Controllers/school.controller'
import registerForSchool from '../Controllers/register.school'
import loginController from '../Controllers/login.controller'
import soundController from '../Controllers/sound.controller'
import multer from 'multer'
import regsiterWithFileController from '../Controllers/registerWithFile'

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

router.route('/logout')
    .get(logout)    

// school apis
router.route('/get-all-school').get(schoolController.getAllSchool)
router.route('/create-school').post(registerForSchool.registerForSchool)
router.route('/school-count').get(schoolController.schoolStatCount)
router.route('/delete-school/:id').delete(schoolController.schoolDelete)
router.route('/search-school').post(schoolController.searchSchool)
router.route('/get-school/:id').get(schoolController.schoolViewById)



router.route('/sound-change/:_id').post(soundController.updateSoundSetting)
router.route('/sound-change/grab/:_id').get(soundController.sendSoundSetting)


router.route('/change-password/:_id').post(loginController.changePassword)


router.route('/create-emp-from-file').post(upload.single('file'), regsiterWithFileController.registerEmpWithFile)
router.route('/create-school-from-file').post(upload.single('file'), regsiterWithFileController.registerSchoolWithFile)



// verify token
router.route('/verify-token/:token').get(loginController.verifyLogin)


router.route('/change-password/:_id').post(loginController.changePassword)


export default router