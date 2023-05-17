import { Task } from "../models/task.js";

export const addTask = async (req, res) => {
  try {
    const { title, desc } = req.body;
    const { id } = req.user;
    await Task.create({ title, desc, userId: id });

    res.status(201).json({ success: true });
  } 
    catch (error) {
    res.status(400).json({success: false, message: "not a valid id",});
  }
};

export const allTask = async (req, res) => {
  const { id } = req.user;
  const tasks = await Task.find({ userId: id });

  res.status(200).json({
    success: true,
    tasks,
  });
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params; 
    const task=await Task.findById(id);  
    
    if(task) {
        task.completed=!task.completed;
        await task.save();
      
        res.status(200).json({
          success: true,
          message: "done ",
        });
    }
    else res.status(400).json({success: false, message: "not found"});
  } 
  catch (error) {    
    res.status(400).json({success: false, message: "not a valid task id"});
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);
    
    res.status(200).json({
      success: true,
      message: "deleted task ",
    }); 
  }
   catch (error) {
    res.status(400).json({success: false, message: "not a valid task id"});
  }
};
