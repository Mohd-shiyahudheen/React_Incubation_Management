const express = require('express')
const { authAdmin, editCompanyInfo, Processing, Approved, Rejecting,
    approvedIncubation, rejectingIncubation, processedIncubation,
    slotsInfo, getAllApproved, updateSlot, removeslotDuplicate, } = require('../controllers/adminControllers')


const router = express.Router()



router.route('/login').post(authAdmin)
router.route('/viewcompany/:id').get(editCompanyInfo)
router.route('/processing/:id').put(Processing)
router.route('/approved/:id').put(Approved)
router.route('/rejecting/:id').put(Rejecting)
router.route('/approveStatus').get(approvedIncubation)
router.route('/rejecteStatus').get(rejectingIncubation)
router.route('/processedStatus').get(processedIncubation)
router.route('/slots').get(slotsInfo)
router.route('/getApprovedApp').get(getAllApproved)
router.route('/slotupdate').put(updateSlot)
router.route('/removeduplicate').put(removeslotDuplicate)















module.exports = router; 