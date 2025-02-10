import { getTasks } from "@/app/actions/taskAction";
import UpdateTaskAction from "./updateTaskAction";

export default async function EditTask({ params }) {
  const tasks = await getTasks();
  const task = tasks.find((t) => t._id === params.id);

  if (!task) return <p>Task not found</p>;

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Task</h1>

      {/* ✅ Use separate Server Action */}
      <UpdateTaskAction task={task} />
    </main>
  );
}