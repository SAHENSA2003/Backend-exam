import mongoose  from "mongoose";
import dotenv from "dotenv/config"

const dbConnect = async (req,res)=>{
    try {
      const url = process.env.URL;
      const connection = await mongoose.connect(url);
      console.log(`db successfully connected ..`);   
    } catch (error) {
        console.log(error)
    }
};

export default dbConnect;