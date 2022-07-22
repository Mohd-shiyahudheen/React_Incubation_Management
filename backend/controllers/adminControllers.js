const asyncHandler = require('express-async-handler')
const Admin = require('../models/UserSchema').Admin
const Form = require("../models/UserSchema").Form;
const Slot = require("../models/UserSchema").Slot;



const authAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const admin = await Admin.findOne({ email })


    if (admin && (await password == admin.password)) {
        res.json({
            _id: admin._id,
            email: admin.email,
        })
    }
    else {
        res.status(400)
        throw new Error("Invalid username or password")
    }

})

//Company details showing//
const editCompanyInfo = asyncHandler(async (req, res) => {
    console.log(req.params.id);
    const id = req.params.id
    const editcompany = await Form.findById({ _id: id })
    console.log(editcompany);
    res.json(editcompany)
})

//Status Changing-Processing//
const Processing = asyncHandler(async (req, res) => {
    const id = req.params.id
    const processingStatus = await Form.updateOne({ _id: id }, {
        $set: {
            companystatus: "Processing"
        }
    })
    console.log(processingStatus);
    res.json(processingStatus)
})
//Statuse Changing Approved//
const Approved = asyncHandler(async (req, res) => {
    const id = req.params.id
    const approvedStatus = await Form.updateOne({ _id: id }, {
        $set: {
            companystatus: "Approved"
        }
    })
    console.log(approvedStatus);
    res.json(approvedStatus)
})

//Statuse Changing Rejecting//
const Rejecting = asyncHandler(async (req, res) => {
    const id = req.params.id
    const rejectingStatus = await Form.updateOne({ _id: id }, {
        $set: {
            companystatus: "Rejecting"
        }
    })
    console.log(rejectingStatus);
    res.json(rejectingStatus)
})

//finding approved incubation//
const approvedIncubation = asyncHandler(async (req, res) => {
    const comapnyStatus = await Form.find({ companystatus: "Approved" })
    console.log(comapnyStatus);
    res.json(comapnyStatus)
})

//finding Rejected incubation//
const rejectingIncubation = asyncHandler(async (req, res) => {
    const comapnyStatus = await Form.find({ companystatus: "Rejecting" })
    console.log(comapnyStatus);
    res.json(comapnyStatus)
})

//finding Processed incubation//
const processedIncubation = asyncHandler(async (req, res) => {
    const comapnyStatus = await Form.find({ companystatus: "Processing" })
    console.log(comapnyStatus);
    res.json(comapnyStatus)
})

//Get all Slots//
const slotsInfo = asyncHandler(async (req, res) => {
    const slotinfo = await Slot.find({})

    res.json(slotinfo)
})

//get all Approved Application to booking//
const getAllApproved = asyncHandler(async (req, res) => {
    const approvedApp = await Form.find({
        $and: [{ companystatus: "Approved" }, { bookingstatus: "false" }],
    })
    res.json(approvedApp)
})


//Slot allocation//
const updateSlot = asyncHandler(async (req, res) => {
    const { appid, slotId } = req.body
    console.log(appid);
    const getApp = await Form.findById({ _id: appid })
    console.log(getApp);
    const updateslot = await Slot.updateMany({ _id: slotId }, {
        $set: {
            selected: true,
            companyname: getApp.companyname,
            useremail: getApp.email
        }
    })
    console.log(updateslot);
    res.json(updateslot)
})

const removeslotDuplicate = asyncHandler(async (req, res) => {
    const { appId } = req.body
    console.log('###');
    console.log(appId);
    const duplicate = await Form.findById({ _id: appId })
    console.log(duplicate);
    if (!duplicate.bookingstatus) {
        await Form.updateOne({ _id: appId }, {
            $set: {
                bookingstatus: true
            }
        })
        res.status(200).json({ duplicateRemoved: true });
    }
})





module.exports = {
    authAdmin,
    editCompanyInfo,
    Processing, Approved,
    Rejecting, approvedIncubation,
    rejectingIncubation, processedIncubation, slotsInfo,
    getAllApproved, updateSlot, removeslotDuplicate
}