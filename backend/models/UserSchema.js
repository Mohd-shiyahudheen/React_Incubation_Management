const mongoose=require('mongoose')


const userschema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        required:true,
        default:false
    },
   
},
    {
        timestamps:true
    })
    
    const User=mongoose.model('User',userschema)



const adminSchema = mongoose.Schema({
    email: {
        required: true,
        unique: true,
        type: String
    },
    password: {
        type: String,
        required: true
    }
})

const Admin = mongoose.model('Admin', adminSchema)

//Applcation Schema//

const applicationschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,

    },

    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    team: {
        type: String,
        required: true
    },
    product: {
        type: String,
        required: true
    },
    problem: {
        type: String,
        required: true
    },
    solution: {
        type: String,
        required: true
    },
    proposition: {
        type: String,
        required: true
    },
    competators: {
        type: String,
        required: true
    },
    revenue: {
        type: String,
        required: true
    },
    potential: {
        type: String,
        required: true
    },
    plan: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    proposel: {
        type: String,
        required: true
    },
    companystatus:{
        type:String
    },
    bookingstatus:{
        type:Boolean,
    },
    userid: {

        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

})
const Form = mongoose.model('Form2', applicationschema)

//Solt Booking Schema//
const slotschema = new mongoose.Schema({
    section: {
        type: String,

    },
    selected: {
        type: Boolean,
        default: false
    },
    slot_no: { 
        type: Number
    },
    companyname: {
        type: String
    },
    useremail: {
        type: String
    }


})
const Slot = mongoose.model('Slot', slotschema)

module.exports={User,Admin,Form,Slot}

