import mongoose from 'mongoose'
import { DB_NAME } from '../constants.js';
 
const connectDb=async()=>{
  try {
    console.log('Before mongoose.connect');
   const connectionInstance= await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)

   // checking connection host
   console.log(`db connect to host :${connectionInstance.connection.host}`)
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    console.error('Full error details:', error);
    setTimeout(() => process.exit(1), 1000);
  }

}

export default connectDb
