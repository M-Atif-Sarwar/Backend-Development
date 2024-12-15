import express from 'express'
import cookieParser from "cookie-parser"
import cors from "cors"

const app=express();

// cors are used to allow requests from request its middle ware
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true,
}))

// middle ware for all 
app.use(express.json({limit:'16kb'}))
app.use(express.static('public'))
app.use(express.urlencoded({limit:'16kb'}))
app.use(cookieParser())

// defing user routes
import userRouter from "./routes/userRoutes.js"

// defing routes
app.use('/api/v1/user',userRouter)

export {app}