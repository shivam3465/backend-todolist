import mongoose from "mongoose";

const schema=new mongoose.Schema({
    title:{
        type: String,
        required: true,        
    },
    desc:{
        type: String,
        required: true,        
    },
    completed:{
        type: Boolean,
        default: false,        
    },
    userId:{
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,        
    },
});

export const Task=mongoose.model('tasks',schema);