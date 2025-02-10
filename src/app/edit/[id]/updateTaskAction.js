"use client";
import { useState } from "react";
import { updateTask } from "@/app/actions/taskAction";

export default function UpdateTaskAction({ task }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.target);
    try {
      await updateTask(task._id, formData);
      window.location.href = "/"; // ✅ Redirect after update
    } catch (err) {
      setError("Failed to update task.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      {error && <p className="text-red-500">{error}</p>}
      <input name="title" defaultValue={task.title} required className="border p-2 rounded" />
      <textarea name="description" defaultValue={task.description} className="border p-2 rounded"></textarea>
      <input type="date" name="dueDate" defaultValue={task.dueDate?.split("T")[0]} className="border p-2 rounded" />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        {loading ? "Updating..." : "Update Task"}
      </button>
    </form>
  );
}
