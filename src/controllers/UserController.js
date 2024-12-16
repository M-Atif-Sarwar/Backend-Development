import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {asyncHandler} from "../utils/asyncHandler.js"

export const RegisterUser=asyncHandler(async (req,res)=>{
 
    //getting data from the front end
    const {fullname,username,email,password}=req.body
    console.log(fullname,username,email,password)

    // checking if any field is empty
    //some method check if any item condion is true
    //it reutn ture even one of it is empty
    if(
        [fullname,username,email,password].some((items)=>items?.trime()==="")
    ){
        throw new Error('Fields are empty');
    }

    //checking if user already exist in database
    const existedUser=User.findOne(
        {
            $or:[{username},{email}]
        }
    )
    if(existedUser){
        throw new Error('User already existed')
    }

    // checking for vaatr and image file using multer middleware
    // ?. means optionalchaining
    const AvatarLocalPath=req.files?.avatar[0]?.path;
    const CoverImageLocalPath=req.files?.coverImage[0]?.path;
    if(!AvatarLocalPath){
        throw Error(400,"Avtar is required")
    }

    // uploding to cloudinary
    const avatar=await uploadFiles(AvatarLocalPath)
    const coverImage=await uploadFiles(CoverImageLocalPath)

    // creating user object to pass into database
  const user= await User.create(
        {
            username:username.toLowerCase(),
            email,
            password,
            avatar:avatar.url,
            coverImage:coverImage?.url || "",
            fullname,
        }
    )

    // finding user and removinf pssword and refreshToken
    const createdUser= await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if(!createdUser){
        throw Error("Something went wrong while Registering User")
    }

    //returning response 
    return res.status(200).json(
        new ApiResponse(200,createdUser,"User Created Successfull",)
    )
})