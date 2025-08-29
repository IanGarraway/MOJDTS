import { Schema, model } from "mongoose";

/**
 * Task Schema
 * Defines the structure of a Task document in MongoDB.
 */
const taskSchema = new Schema({
    taskTitle: { type: String, required: true },
    taskDescription: { type: String, required: false },
    taskStatus: { type: Number, required: true },
    taskDueDate: {type: Date, required: true}
})

const Task = model("Task", taskSchema);

export default Task;