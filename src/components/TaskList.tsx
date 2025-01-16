import { useState } from "react";
import { api } from "~/utils/api";
import { TaskForm } from "./TaskForm";

export function TaskList() {
  const [editingId, setEditingId] = useState<string | null>(null);
  const utils = api.useContext();
  
  const { data: tasks, isLoading } = api.task.getAll.useQuery();
  
  const { mutate: deleteTask } = api.task.delete.useMutation({
    onSuccess: () => {
      void utils.task.getAll.invalidate();
    },
  });

  if (isLoading) return <div>Loading tasks...</div>;
  if (!tasks?.length) return <div>No tasks yet!</div>;

  return (
    <ul className="space-y-4">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="rounded-md border p-4"
        >
          {editingId === task.id ? (
            <TaskForm
              initialData={task}
              isEditing
              onSuccess={() => setEditingId(null)}
            />
          ) : (
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">{task.title}</h3>
                {task.description && (
                  <p className="text-gray-600">{task.description}</p>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setEditingId(task.id)}
                  className="rounded-md bg-gray-500 px-3 py-1 text-white hover:bg-gray-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTask({ id: task.id })}
                  className="rounded-md bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
} 