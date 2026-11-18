
import taskSchema from "../model/taskSchema.js";


export const createTask = async (req, res) => {
    try {
        
        const { title, description } = req.body;
        const exist = await taskSchema.findOne({title:title.trim()});
        console.log(exist);
        if(exist){
            return res.status(400).json({
                success:false,
                message:"taks already eixst!!"
            })
        }
        if (!title.trim() || !description.trim()) {
            return res.status(401).json({
                success: false,
                message: "title and description is required to login"
            })
        };

        const task = await taskSchema.create({ title:title.trim(), description, userId: req.userId });
        if (task) {
            return res.status(201).json({
                success: true,
                message: "taks create successfully of this user"
            })
        };
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error!!"
        })
    }
};

export const getAlltaks = async (req, res) => {
    try {
        const alltaks = await taskSchema.find({ userId: req.userId });
        console.log(alltaks);
        return res.status(200).json({
            success: false,
            message: alltaks.length === 0 ? "no todo found of this user" : "todo fetched successfully",
            data: alltaks
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "internal server error"
        })
    }
};

export const deleteTask = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(401).json({
                success: false,
                message: "please give the id in params properly"
            })
        }
        const task = await taskSchema.findOneAndDelete(
            { _id: id, userId: req.userId }
        );
        if (!task) {
            return res.status(402).json({
                success: false,
                message: "invalid todo"
            });
        };

        return res.status(200).json({
            success:true,
            message:"todo deleted successfully",
            data:task
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
};