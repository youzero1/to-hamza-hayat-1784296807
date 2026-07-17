import { useState, useRef, useEffect } from "react";
import { Check, Trash2, Pencil, X } from "lucide-react";
import type { Todo } from "../types/todo";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  const handleSave = () => {
    if (editText.trim()) {
      onEdit(todo.id, editText);
      setEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") handleCancel();
  };

  return (
    <div
      className={`group flex items-center gap-3 p-4 rounded-2xl transition-all duration-200 ${
        todo.completed
          ? "bg-white/5 opacity-60"
          : "bg-white/10 hover:bg-white/15"
      }`}
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(todo.id)}
        className={`flex-shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
          todo.completed
            ? "bg-green-400 border-green-400 text-white"
            : "border-white/30 hover:border-white/60"
        }`}
      >
        {todo.completed && <Check size={14} strokeWidth={3} />}
      </button>

      {/* Text or Edit Input */}
      {editing ? (
        <input
          ref={inputRef}
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleSave}
          className="flex-1 bg-white/10 text-white px-3 py-1.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30"
        />
      ) : (
        <span
          onDoubleClick={() => setEditing(true)}
          className={`flex-1 text-white cursor-default select-none ${
            todo.completed ? "line-through" : ""
          }`}
        >
          {todo.text}
        </span>
      )}

      {/* Action Buttons */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {editing ? (
          <button
            onClick={handleCancel}
            className="p-2 rounded-xl text-white/50 hover:text-white hover:bg-white/10 transition-all"
          >
            <X size={16} />
          </button>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="p-2 rounded-xl text-white/50 hover:text-white hover:bg-white/10 transition-all"
          >
            <Pencil size={16} />
          </button>
        )}
        <button
          onClick={() => onDelete(todo.id)}
          className="p-2 rounded-xl text-white/50 hover:text-red-300 hover:bg-red-500/10 transition-all"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}
