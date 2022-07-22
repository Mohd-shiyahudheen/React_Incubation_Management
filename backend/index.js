const express=require('express')
const config =require('./config/connection')
const dotenv=require('dotenv')
const UserRoutes=require('./Routes/UserRout')
const AdminRoutes=require('./Routes/AdminRout')
const { errorHandler, notFound } = require('./middleware/errorHandler')

const app=express()
dotenv.config()

app.use(express.json())
// app.use('/', UserRoutes)

app.get('/',(req,res)=>{
    res.send('api is running')
})

app.use('/api/users',UserRoutes)
app.use('/api/admins',AdminRoutes)
app.use(errorHandler)
app.use(notFound)


const PORT=process.env.PORT||5000

app.listen(PORT,console.log(`server started at port ${PORT}`)) //template literal