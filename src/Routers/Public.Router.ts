import express, { Request, Response } from 'express'
const router = express.Router()
import registerController from '../Controllers/regsiter.controller'
import loginController from '../Controllers/login.controller'
import loginWithPassword from '../Controllers/AdminPanelController/loginWithPassword'
import handleRefreshToken from '../Controllers/refreshToken.controller'
import logout from '../Controllers/logout'
import endUserLoginController from '../Controllers/endUserController/login'

import nutrisistController from '../Controllers/AdminPanelController/nutrisist.controller'

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


router.route('/logout').get(logout)


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


router.route('/refresh-token').get(handleRefreshToken)



// end user apis
// router.route('/create-end-user').post(endUserController.regsiterEndUser)

// send the otp
router.route('/send-otp').post(endUserLoginController.loginWithPhone)
router.route('/verify-otp').post(endUserLoginController.verifyOTP)



router.route('/diet-plan/:id').post(nutrisistController.dietPlanner)

export default router