import { Check, Trash2 } from 'lucide-react';
import type { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <div
      className={`group flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-200
        ${todo.completed
          ? 'bg-gray-50 border-gray-100'
          : 'bg-white border-gray-200 hover:border-violet-200 hover:shadow-sm'
        }`}
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(todo.id)}
        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200
          ${todo.completed
            ? 'bg-violet-500 border-violet-500'
            : 'border-gray-300 hover:border-violet-400'
          }`}
      >
        {todo.completed && <Check size={14} className="text-white" strokeWidth={3} />}
      </button>

      {/* Text */}
      <span
        className={`flex-1 text-sm transition-all duration-200 ${
          todo.completed ? 'text-gray-400 line-through' : 'text-gray-700'
        }`}
      >
        {todo.text}
      </span>

      {/* Delete */}
      <button
        onClick={() => onDelete(todo.id)}
        className="flex-shrink-0 opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-gray-400 
                   hover:text-red-500 hover:bg-red-50 transition-all duration-200"
        aria-label="Delete todo"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}
