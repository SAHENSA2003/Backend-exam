import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        require:true
    },
    email:{
      type:String,
      require:true
    },
    password:{
        type:String,
        require:true,
    },
    isLoggedIn:{
        type:Boolean,
        default:false
    }
},{timestamps:true});

export default mongoose.model("userData Exam",userSchema);