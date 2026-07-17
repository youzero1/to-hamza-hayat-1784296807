import { useState } from "react";
import { Plus } from "lucide-react";

interface TodoInputProps {
  onAdd: (text: string) => void;
}

export default function TodoInput({ onAdd }: TodoInputProps) {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onAdd(value);
      setValue("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="What needs to be done?"
        className="flex-1 px-5 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-white/40 text-lg focus:outline-none focus:ring-2 focus:ring-white/30 focus:bg-white/15 transition-all duration-200"
      />
      <button
        type="submit"
        disabled={!value.trim()}
        className="px-5 py-4 rounded-2xl bg-white text-purple-700 font-semibold hover:bg-white/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2 shadow-lg shadow-purple-900/20"
      >
        <Plus size={20} strokeWidth={2.5} />
        <span className="hidden sm:inline">Add</span>
      </button>
    </form>
  );
}
