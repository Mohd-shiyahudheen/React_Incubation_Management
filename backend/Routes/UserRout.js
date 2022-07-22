const express=require('express')
const {registerUser, authUser, userData, removeUserData,companyInfo, companyData, statusData,}=require('../controllers/userControllers')

const router=express.Router()


router.route('/').post(registerUser)
router.route('/login').post(authUser)
router.route('/user').get(userData)
router.route('/delete/:id').delete(removeUserData)
router.route('/application').post(companyInfo)
router.route('/data').get(companyData)
router.route('/status/:id').get(statusData)




module.exports=router; 

