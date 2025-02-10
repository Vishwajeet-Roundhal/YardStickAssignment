"use server";
export const runtime = "edge"; // ✅ Runs Server Actions on Vercel Edge

import { connectDB } from "@/app/lib/db";
import { Task } from "@/app/model/Task";

// Fetch tasks
export async function getTasks() {
  await connectDB();
  const tasks = await Task.find().lean(); // ✅ Converts Mongoose objects to plain JSON

  // ✅ Convert `_id` from ObjectId to String
  return tasks.map(task => ({
    ...task,
    _id: task._id.toString(), // ✅ Ensure `_id` is a string
    dueDate: task.dueDate ? task.dueDate.toISOString() : null, // ✅ Convert Date to string
  }));
}

// Add task
export async function addTask(formData) {
  await connectDB();
  const { title, description, dueDate } = Object.fromEntries(formData);
  const newTask = new Task({ title, description, dueDate });
  await newTask.save();
}

// Toggle task completion
export async function toggleTaskCompletion(id) {
  await connectDB();
  const task = await Task.findById(id);
  if (task) {
    task.completed = !task.completed;
    await task.save();
  }
}

// Update task
export async function updateTask(id, formData) {
  await connectDB();
  const { title, description, dueDate } = Object.fromEntries(formData);

  await Task.findByIdAndUpdate(id, {
    title,
    description,
    dueDate: dueDate ? new Date(dueDate) : null,
  });
}

// Delete task
export async function deleteTask(id) {
  await connectDB();
  await Task.findByIdAndDelete(id);
}
