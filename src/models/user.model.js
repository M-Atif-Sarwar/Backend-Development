import mongoose, { Mongoose } from "mongoose"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
const userSchema=new mongoose.Schema(
    {
        username:{
            type:String,
            required:true,
            lowecase:true,
            trim:true,
            index:true,
            unique:true,
        },

        email:{
            type:String,
            required:true,
            lowecase:true,
            trim:true,
            unique:true,
        },

        fullname:{
            type:String,
            required:true,
            trim:true,
            index:true,
        },

        username:{
            type:String, //from cloudinary url
            required:true,
        },

        coverImage:{
            type:String,
        },

        watchHistory:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"Video"
            }
        ],

        password:{
            type:String,
            required:true,
        },

        refreshToken:{
            type:String,
        },




    }
    ,{timestamps:true});


// Adding pre middleware for password incryptipn using bcrypt.js
userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next()
    this.password=bcrypt.hash(this.password,11);
     next()
})

// comparing password
userSchema.methods.isPasswordCorrect=async function(password){
  return await  bcrypt.compare('password',this.password)
}

// creting jwt Token
userSchema.methods.generateAccessToken=function(){
  return  jwt.sign({
        _id:this._id,
        email:this.email,
        username:this.username,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
)
}

userSchema.methods.generateRefreshToken=function(){
    return  jwt.sign({
          _id:this._id,
        
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
          expiresIn:process.env.REFRESH_TOKEN_EXPIRY
      }
  )
  }
  

export const User=mongoose.model('User',userSchema)
