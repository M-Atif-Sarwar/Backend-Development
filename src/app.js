import express from 'express'
import cookieParser from "cookie-parser"
import cors from "cors"

// cors are used to allow requests from request its middle ware
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true,
}))

const app=express();

app.use(express.json({limit:'16kb'}))
app.use(express.static('public'))
app.use(express.urlencoded({limit:'16kb'}))
app.use(cookieParser())
export {app}