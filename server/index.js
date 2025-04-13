//1
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
//4
import cookieParser from 'cookie-parser';






//6
import morgan from 'morgan'
import helmet from 'helmet'
import connectDB from './config/connectDB.js';
const app = express()

app.use(cors(
  {
    credentials: true,
    origin: process.env.FRONTEND_URL

  }
))
//3
app.use(express.json())
//5
app.use(cookieParser())
app.use(morgan('dev')); // or 'combined'

app.use(helmet({
crossOriginResourcePolicy: false
}))

const PORT = 8080 || process.env.PORT


//6
app.get("/",(req,res)=>
{
  // server to client
  res.json({
    message:"Server is running "  + PORT
  })
})

connectDB()


app.listen(PORT,()=>
{
  console.log("server is running ",PORT)
})