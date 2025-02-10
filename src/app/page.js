"use client"

import { getTasks, addTask, toggleTaskCompletion, deleteTask } from "@/app/actions/taskAction";
import Link from "next/link";
import { useEffect, useState, useOptimistic } from "react";
import "./styles.css"

export default function Home() {
  const [tasks, setTasks] = useState([]);  // ✅ Store tasks in state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTasks() {
      const data = await getTasks();
      setTasks(data);
      setLoading(false);
    }
    fetchTasks();
  }, []);

  // ✅ Optimistic UI: Immediately update tasks when adding/deleting
  const addTaskOptimistic = async (formData) => {
    const newTask = {
      _id: Math.random().toString(36).substr(2, 9), // Temporary ID
      title: formData.get("title"),
      description: formData.get("description"),
      dueDate: formData.get("dueDate"),
      completed: false,
    };
    setTasks([...tasks, newTask]);  // ✅ Optimistically add task
    await addTask(formData); // ✅ Actually add to DB
    setTasks(await getTasks()); // ✅ Re-fetch tasks after DB update
  };

  const deleteTaskOptimistic = async (id) => {
    setTasks(tasks.filter((task) => task._id !== id));  // ✅ Remove from UI first
    await deleteTask(id); // ✅ Delete from DB
    setTasks(await getTasks()); // ✅ Re-fetch tasks after DB update
  };

  return (
    <main>
      <h1>Task Manager</h1>

      <form action={addTaskOptimistic}>
        <input name="title" placeholder="Task title" required />
        <textarea name="description" placeholder="Task description"></textarea>
        <input type="date" name="dueDate" />
        <button>Add Task</button>
      </form>

      {loading ? <p>Loading...</p> : (
        <ul>
          {tasks.map((task) => (
            <li key={task._id}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p>Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No Due Date"}</p>
              <div>
                <button onClick={() => deleteTaskOptimistic(task._id)}>🗑 Delete</button>
                <Link href={`/edit/${task._id}`}>✏ Edit</Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
