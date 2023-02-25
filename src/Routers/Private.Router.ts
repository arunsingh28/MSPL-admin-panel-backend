import express from 'express'
import logout from '../Controllers/logout'
import schoolController from '../Controllers/school.controller'
import registerForSchool from '../Controllers/register.school'

const router = express.Router()

    
router.route('/logout')
    .get(logout)    

// school apis
// router.route('/get-all-school').get(schoolController.getAllSchool)
// router.route('/create-school').post(registerForSchool.registerForSchool)
// router.route('/school-count').get(schoolController.schoolStatCount)
// router.route('/delete-school/:id').delete(schoolController.schoolDelete)
// router.route('/search-school').post(schoolController.searchSchool)
// router.route('/get-school/:id').get(schoolController.schoolViewById)

export default router