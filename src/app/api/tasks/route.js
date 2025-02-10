import { connectDB } from "@/app/lib/db";
import { Task } from "@/app/model/Task"; // ✅ Ensure correct path

export const runtime = "edge"; // Optional: Use Edge functions on Vercel

export async function GET() {
  await connectDB();
  
  // ✅ Check if Task is correctly imported
  if (!Task) {
    console.error("❌ Task model is undefined. Check import path.");
    return Response.json({ error: "Task model not found" }, { status: 500 });
  }

  const tasks = await Task.find().lean();
  return Response.json(tasks.map(task => ({
    ...task,
    _id: task._id.toString(),
    dueDate: task.dueDate ? task.dueDate.toISOString() : null,
  })));
}
