import { app } from './app.js'
import connectDb from './db/db.js'

import dotenv from "dotenv"

dotenv.config({path:'./env'})

connectDb()
.then(()=>{
    app.listen(process.env.PORT || 3000,()=>{
        console.log(`server is running on ${process.env.PORT}`)
    })
})
.catch((err)=>console.log(err))