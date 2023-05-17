import express from "express";
import { authenticated } from "../middleware/auth.js";
import { addTask, allTask, deleteTask, updateTask } from "../controllers/task.js";

const router =express.Router();

router.post('/add', authenticated,addTask);
router.get('/all', authenticated,allTask);

router
    .put('/:id', authenticated,updateTask)
    .delete('/:id', authenticated,deleteTask);

export default router;