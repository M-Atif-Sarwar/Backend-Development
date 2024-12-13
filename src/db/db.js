import mongoose from 'mongoose'
import { DB_NAME } from '../constants.js';
 
const connectDb=async()=>{
  try {
   const connectionInstance= await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)

   // checking connection host
   console.log(`db connect to host :${connectionInstance.connection.host}`)
  } catch (error) {
    console.error('ERROR',error);
  }

}

export default connectDb
