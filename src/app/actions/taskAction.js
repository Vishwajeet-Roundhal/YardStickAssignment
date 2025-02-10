"use server";

import { connectDB } from "@/app/lib/db";
import { Task } from "@/app/model/Task";

// Fetch tasks
// ✅ Fetch tasks (No Edge runtime here)
export async function getTasks() {
  await connectDB();
  try {
    const tasks = await Task.find().lean();
    return tasks.map((task) => ({
      ...task,
      _id: task._id.toString(),
      dueDate: task.dueDate ? task.dueDate.toISOString() : null,
    }));
  } catch (error) {
    console.error("error fetching tasks", error);
    return [];
  }
}

// Add task
export async function addTask(formData) {
  await connectDB();
  try {
    const { title, description, dueDate } = Object.fromEntries(formData);
    const newTask = new Task({ title, description, dueDate });
    await newTask.save();
  } catch (error) {
    console.error("error adding task", error);
    return false;
  }
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
  try {
    const { title, description, dueDate } = Object.fromEntries(formData);

    await Task.findByIdAndUpdate(id, {
      title,
      description,
      dueDate: dueDate ? new Date(dueDate) : null,
    });
  } catch (error) {
    console.error("error updating task", error);
  }
}

// Delete task
export async function deleteTask(id) {
  await connectDB();
  await Task.findByIdAndDelete(id);
}
