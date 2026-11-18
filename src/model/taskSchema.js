import mongoose from "mongoose";




const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    userId:{
        type:String,
        require:true
    }
}, { timestamps: true });

export default mongoose.model("userTaskData Exam",taskSchema);