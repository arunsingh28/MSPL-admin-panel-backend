import express from "express";
const router = express.Router();
import endUserController from '../Controllers/Mobile/account.controller'
import PackageController from '../Controllers/AdminPanelController/Package.controller'
import mobileController from "../Controllers/Mobile/mobile.controller";
import lmsController from '../Controllers/LMS/lms.controller'
import editUserController from "../Controllers/Mobile/editUser.controller";
import contactController from "../Controllers/Mobile/contact.controller";

router.route('/create-end-user').post(endUserController.regsiterEndUser)
router.route('/get-user-info/:id').get(endUserController.getUserById)

router.route('/get-all-package').get(PackageController.handleGetAllPackages)

//get user info by id
router.route('/get-user-info/:id').get(endUserController.getUserById)

// get nutrition apis
router.route('/get-nutrition-profile/:id').get(mobileController.nutritionProfile)

// get all packages
// controller file -> src/Controllers/AdminPanelController/Package.controller.ts
router.route('/get-all-package').get(PackageController.handleGetAllPackages)

// get all recpies
router.route('/get-all-recpies').get(mobileController.sendAllRecipie)

// get recpie by category
router.route('/get-recpie-by-category/:category').get(mobileController.sendRecipieByCategory)

// water apis
router.route('/water-intake').get(mobileController.saveWaterIntake)
router.route('/water-outtake').get(mobileController.saveWaterOuttake)

router.route('/get-all-course').get(lmsController.getAllModules)

router.route('/get-banner').get(mobileController.getBanner)


// home api
router.route('/home/:id').get(mobileController.homePage)

// edit profile
router.route('/update-profile/:id').post(editUserController.updateUserProfile)

// get all food category
router.route('/get-all-food-category').get(mobileController.getFoodCategory)

// contact-us api
router.route('/contact-us/:id').post(contactController.raseNewRequest)



// diet plan apis
router.route('/get-diet-plan/:id').get(mobileController.getDietPlan)


export default router