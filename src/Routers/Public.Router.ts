import express, { Request, Response } from 'express'
const router = express.Router()
import registerController from '../Controllers/regsiter.controller'
import loginController from '../Controllers/login.controller'
import loginWithPassword from '../Controllers/loginWithPassword'
import regsiterWithFileController from '../Controllers/registerWithFile'
import multer from 'multer'
import schoolController from '../Controllers/school.controller'
import registerForSchool from '../Controllers/register.school'
import soundController from '../Controllers/sound.controller'


var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname + "../../" + "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-bulk-${file.originalname}`);
    },
});

const upload = multer({ storage })



/**
 * register api
 * @swagger
 * /v1/api/register:
 *  post:
 *      description: Create new user
 *      parameters:
 *      - firstName: title
 *        description: user first name
 *        in: formData
 *        required: true
 *        type: String
 *      responses:
 *        201:
 *           description: Success
 */
router.route('/register')
    .get((req: Request, res: Response) => { return res.json({ message: 'GET METHOD NOT ALLOWED' }) })
    .post(registerController)




/**
 * login api
 * @swagger
 * /v1/api/login:
 *  post:
 *      description: send the otp to phone
 *      parameters:
 *      - phone: title
 *        description: user phone number (10 digit)
 *        in: formData
 *        required: true
 *        type: Mobile number
 *      responses:
 *        200:
 *           description: Success
 *        cookie:
 *           description: token (valid for 2-5 min only. After that token will expire)
 *        otp:
 *           description: otp
 */

/**login api
 * @swagger
 * /v1/api/login:
 *  put:
 *      description: verify the otp
 *      parameters:
 *      - otp: title
 *        description: enter otp which is sent to phone
 *        in: formData
 *        required: true
 *        type: OTP
 *      responses:
 *        200:
 *           description: Success
 *        cookie:
 *           description: refresh token (valid for 1 day)
 *        access token:
 *           description: access token (valid for 10-20 min. After that it will expire)
 */
router.route('/login-with-otp')
    .get((req: Request, res: Response) => { return res.json({ message: 'GET METHOD NOT ALLOWED' }) })
    .post(loginController.sendOtp)
    .put(loginController.verifyOtp)

// login with password
router.route('/login')
    .get((req: Request, res: Response) => { return res.json({ message: 'GET METHOD NOT ALLOWED' }) })
    .post(loginWithPassword.loginWithPassword)



router.route('/create-emp-from-file').post(upload.single('file'), regsiterWithFileController.registerEmpWithFile)
router.route('/create-school-from-file').post(upload.single('file'), regsiterWithFileController.registerSchoolWithFile)

// verify token
router.route('/verify-token/:token').get(loginController.verifyLogin)


// school router
router.route('/get-all-school').get(schoolController.getAllSchool)
router.route('/create-school').post(registerForSchool.registerForSchool)
router.route('/school-count').get(schoolController.schoolStatCount)
router.route('/delete-school/:id').delete(schoolController.schoolDelete)
router.route('/search-school').post(schoolController.searchSchool)
router.route('/get-school/:id').get(schoolController.schoolViewById)

router.route('/sound-change/:_id').post(soundController.updateSoundSetting)
router.route('/sound-change/grab/:_id').get(soundController.sendSoundSetting)


router.route('/change-password/:_id').post(loginController.changePassword)

export default router