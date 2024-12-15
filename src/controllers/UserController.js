import {asyncHandler} from "../utils/asyncHandler.js"

export const RegisterUser=asyncHandler(async (req,res)=>{
 
    //getting data from the front end
    const {fullname,username,email,password}=req.body
    console.log(fullname,username,email,password)
})