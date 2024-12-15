import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.INARY_API_SCRETE
});

export const uploadFiles=async (LocalFilePAath)=>{
    try {
        if(!LocalFilePAath) return null
       const cloudinaryResponse=await cloudinary.uploader.upload(
            LocalFilePAath, {
              resource_type:auto,
            },)

            return cloudinaryResponse
         
    } catch (error) {
        fs.unlink(LocalFilePAath) // reomve tenpory stored file on server

        return null
    }
    

}

