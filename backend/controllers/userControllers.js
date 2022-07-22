const asyncHandler = require("express-async-handler");
const User = require("../models/UserSchema").User;
const Form = require("../models/UserSchema").Form;
const generateToken = require("../utils/generateToken");
const bcrypt = require('bcryptjs')


//user Signup//
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  // Check if user exists
  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  })

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})


//User Login//
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  // Check for user email
  const user = await User.findOne({ email })

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid Username Or Password')
  }
})


//User Detailes finding//
const userData = asyncHandler(async (req, res) => {
  const userInfo = await User.find({});

  res.json(userInfo);
});

//Deleting user//
const removeUserData = asyncHandler(async (req, res) => {
  let id = req.params.id;
  const deleteuser = await User.deleteOne({ _id: id });

  res.json(deleteuser);
});

//Form submistion//
const companyInfo = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    address, city, state, number,
    company, team, product,
    problem, solution, proposition, competators,
    revenue, potential, plan, type, proposel, userid
  } = req.body
  const userExists = await Form.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('user already exists')
  }
  const companydata = await Form.create({
    name,
    email,
    address, city, state, number,
    company, team, product,
    problem, solution, proposition, competators,
    revenue, potential, plan, type, proposel, userid,
    companystatus:"Pending",
    bookingstatus:"false"
  })
  if (companydata) {
    res.status(201).json({
      _id: companydata._id,
      name: companydata.name,
      email: companydata.email,

    })
  } else {
    res.send(400)
    throw new Error('error occured')
  }
})

//company information finding//
const companyData=asyncHandler(async(req,res)=>{
  const applicationData=await Form.find({})
  res.json(applicationData)
})

//company information findung for status// 
const statusData = asyncHandler(async (req, res) => {
  let id=req.params.id
  const applicationStatus = await Form.find({userid:id})
  console.log(applicationStatus);
  res.json(applicationStatus)
})






module.exports = { registerUser, authUser, userData, removeUserData, companyInfo,companyData,statusData, };
