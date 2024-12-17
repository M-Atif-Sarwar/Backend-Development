import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SCRETE
});

export const uploadFiles=async (LocalFilePAath)=>{
    try {
        if(!LocalFilePAath) return null
       const cloudinaryResponse=await cloudinary.uploader.upload(
            LocalFilePAath, {
              resource_type:"auto",
            },)
            // console.log(cloudinaryResponse.url)
            fs.unlinkSync(LocalFilePAath,()=>{
                    console.error("file deleted scuccessfully");
                
                }
            return cloudinaryResponse
         
    } catch (error) {
        fs.unlink(LocalFilePAath,(error)=>{
            if (error) {
                console.error("Failed to delete file:", error);
            } else {
                console.log("File deleted successfully");
            }
        }) // reomve tenpory stored file on server

        return null
    }
    

}

