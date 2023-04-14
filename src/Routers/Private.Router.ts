import express from 'express'
import schoolController from '../Controllers/school.controller'
import registerForSchool from '../Controllers/register.school'
import loginController from '../Controllers/AdminPanelController/settings.controller'
import soundController from '../Controllers/AdminPanelController/sound.controller'
import multer from 'multer'
import regsiterWithFileController from '../Controllers/registerWithFile'
import academyController from '../Controllers/AdminPanelController/academy.controller'
import endUserController from '../Controllers/Mobile/account.controller'
import foodController from '../Controllers/Nutrition/food.controller'
import saveNewRecipie from '../Controllers/Nutrition/Recipies.controller'
import PackageController from '../Controllers/AdminPanelController/Package.controller'
import nutrisistController from '../Controllers/AdminPanelController/nutrisist.controller'
import bannerController from '../Controllers/Mobile/banner.controller'
import sportsListController from "../Controllers/AdminPanelController/sportsList.controller";
import myClientController from '../Controllers/Nutrition/client.controller'
import deleteUserController from '../Controllers/AdminPanelController/deleteUser.controller'

import dietPlanController from '../Controllers/Nutrition/dietPlan.controller'

const router = express.Router()

var serverStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname + "../../" + "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-bulk-${file.originalname}`);
    },
});

const storage = multer.memoryStorage()


const upload = multer({ storage })
const uploadFile = multer({ storage: serverStorage })

// school apis
router.route('/create-school').post(registerForSchool.registerForSchool)
router.route('/get-all-school').get(schoolController.getAllSchool)
router.route('/school-count').get(schoolController.schoolStatCount)
router.route('/delete-school/:id').delete(schoolController.schoolDelete)
router.route('/search-school').post(schoolController.searchSchool)
router.route('/get-school/:id').get(schoolController.schoolViewById)
router.route('/create-school-from-file').post(uploadFile.single('file'), regsiterWithFileController.registerSchoolWithFile)


// admin panel apis
router.route('/verify-token/:token').get(loginController.verifyLogin)
router.route('/change-password/:_id').post(loginController.changePassword)
router.route('/sound-change/:_id').post(soundController.updateSoundSetting)
router.route('/sound-change/grab/:_id').get(soundController.sendSoundSetting)
router.route('/create-emp-from-file').post(uploadFile.single('file'), regsiterWithFileController.registerEmpWithFile)


// user
router.route('/get-all-user').get(endUserController.getAllUsers)
// filter user
router.route('/filter-user').post(endUserController.filterUser)
router.route('/get-user-info/:id').get(endUserController.getUserById)

// academy apis
router.route('/create-academy').post(academyController.registerAcademy)
router.route('/create-coache').post(academyController.createCoach)


router.route('/create-ingridient-from-file').post(uploadFile.single('file'), foodController.addIngridientWithFile)
router.route('/create-ingridient').post(foodController.addIngridient)
router.route('/fetch-ingridient').get(foodController.sendIngridients)
router.route('/delete-ingridient/:id').delete(foodController.deleteIngridients)
router.route('/create-recipe-category').post(foodController.recipieCategory)
router.route('/fetch-recipie-category').get(foodController.sendrecipieCategory)
router.route('/delete-recipe-category/:id').delete(foodController.deleteRecipeCategory)
router.route('/update-recipe-category/:id').put(foodController.updateRecipeCategory)


router.route('/create-diet-frequency').post(foodController.addDietFrequency)
router.route('/fetch-diet-frequency').get(foodController.sendDietFrequency)
router.route('/delete-diet-frequency/:id').delete(foodController.deleteDietFrequency)
router.route('/update-diet-frequency/:id').put(foodController.updateDietFrequency)




router.route('/save-recipe').post(upload.single('file'), saveNewRecipie.saveNewRecipie)
router.route('/get-recipe').get(saveNewRecipie.getRecipe)
router.route('/delete-recipe/:id').delete(saveNewRecipie.deleteRecipe)
router.route('/get-recipe-by-id/:id').get(saveNewRecipie.getRecipeById)
router.route('/update-recipe')
    .post(upload.single('file'), saveNewRecipie.updateRecipe)
    .put(upload.single('file'), saveNewRecipie.updateRecipe)


// nutritist profile
router.route('/update-nutritist-profile/:id').put(upload.single('file'), nutrisistController.updateProfile)
router.route('/get-nutritist-profile/:id').get(nutrisistController.getNutritionProfile)
// remove profile iamge
router.route('/remove-profile-image/:key/:id').delete(nutrisistController.removeImage)

// package apis
router.route('/create-package').post(PackageController.handleSavePackage)
router.route('/get-all-package').get(PackageController.handleGetAllPackages)


// attach user
router.route('/attach-user-to-nutritionist/:id/:nutriID').post(nutrisistController.attachUser)

router.route('/fetch-all-client/:id').get(myClientController.fetchClient)

// mobile banner
router.route('/create-banner').post(upload.single('file'), bannerController.uploadBanner)
// fetch all banner
router.route('/get-all-banner').get(bannerController.getBanner)
// delete banner
router.route('/delete-banner/:id').delete(bannerController.deleteBanner)

// get all sport by category
router.route('/get-all-sportlist').get(sportsListController.sportsList)
// get save sport intake
router.route('/save-sportlist').post(upload.single('file'), sportsListController.saveSportsList)


// update sport 
// :id is sport id
router.route('/update-sportlist/:id').put(upload.single('file'), sportsListController.updateSportsList)

// delete sport
router.route('/delete-sportlist/:id').delete(sportsListController.deleteSportsList)

// delete client from admin panel
router.route('/delete-client/:id').delete(deleteUserController.deleteUser)


// create diet plan
router.route('/create-diet-plan').post(dietPlanController)

export default router 