import express from "express";
const router = express.Router();
import endUserController from '../Controllers/endUserController/endUser.controller'
import PackageController from '../Controllers/AdminPanelController/Package.controller'
import mobileController from "../Controllers/Mobile/mobile.controller";

router.route('/create-end-user').post(endUserController.regsiterEndUser)
// send the otp


router.route('/get-user-info/:id').get(endUserController.getUserById)

router.route('/get-all-package').get(PackageController.handleGetAllPackages)
router.route('/get-user-info/:id').get(endUserController.getUserById)

// water apis
router.route('/water-intake').get(mobileController.saveWaterIntake)

export default router