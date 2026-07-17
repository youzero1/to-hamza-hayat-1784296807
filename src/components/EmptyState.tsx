import { ClipboardList } from "lucide-react";
import type { FilterType } from "../types/todo";

interface EmptyStateProps {
  filter: FilterType;
  hasTodos: boolean;
}

export default function EmptyState({ filter, hasTodos }: EmptyStateProps) {
  let message = "Add your first todo to get started!";
  if (hasTodos && filter === "active") message = "All tasks are completed! 🎉";
  if (hasTodos && filter === "completed") message = "No completed tasks yet.";

  return (
    <div className="flex flex-col items-center justify-center py-12 text-white/30">
      <ClipboardList size={48} strokeWidth={1.5} className="mb-4" />
      <p className="text-lg">{message}</p>
    </div>
  );
}
