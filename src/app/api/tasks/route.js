export const runtime = "edge"; // ✅ Only allowed inside API routes

import { getTasks } from "@/app/actions/taskAction";

export async function GET() {
  const tasks = await getTasks();
  return Response.json(tasks);
}