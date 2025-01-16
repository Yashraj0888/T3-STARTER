import { useState } from "react";
import { api } from "~/utils/api";
import type { TaskInput } from "~/utils/validation";

interface TaskFormProps {
  onSuccess?: () => void;
  initialData?: TaskInput & { id: string };
  isEditing?: boolean;
}

export function TaskForm({ onSuccess, initialData, isEditing }: TaskFormProps) {
  const [title, setTitle] = useState(initialData?.title ?? "");
  const [description, setDescription] = useState(initialData?.description ?? "");

  const utils = api.useContext();

  const { mutate: createTask, isLoading: isCreating } = api.task.create.useMutation({
    onSuccess: () => {
      void utils.task.getAll.invalidate();
      setTitle("");
      setDescription("");
      onSuccess?.();
    },
  });

  const { mutate: updateTask, isLoading: isUpdating } = api.task.update.useMutation({
    onSuccess: () => {
      void utils.task.getAll.invalidate();
      onSuccess?.();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditing && initialData) {
      updateTask({
        id: initialData.id,
        data: { title, description },
      });
    } else {
      createTask({ title, description });
    }
  };

  const isLoading = isCreating || isUpdating;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          className="w-full rounded-md border p-2"
          disabled={isLoading}
        />
      </div>
      <div>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description (optional)"
          className="w-full rounded-md border p-2"
          disabled={isLoading}
        />
      </div>
      <button
        type="submit"
        disabled={isLoading || !title.trim()}
        className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:opacity-50"
      >
        {isEditing ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
} 