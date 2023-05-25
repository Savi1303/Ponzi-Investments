import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
import userRoute  from './Routes/user.js'
import fundRoute from './Routes/funds.js'
import adminRoute from './Routes/admin.js'
import planRoute from './Routes/plan.js';



dotenv.config()

connectDB().then()

const app = express()

app.use(express.json())
app.use(cors())

app.use(express.urlencoded({ extended: false }));

app.get('/', (req,res)=>{
  res.send('Server running successfully')
})

app.use('/url/users', userRoute)
app.use('/url/funds', fundRoute)
app.use('/url/plans', planRoute)
app.use('/url/1303/admin', adminRoute)


app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
)