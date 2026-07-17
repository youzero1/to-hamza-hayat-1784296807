import { useState } from 'react';
import { Plus } from 'lucide-react';

interface TodoInputProps {
  onAdd: (text: string) => void;
}

export default function TodoInput({ onAdd }: TodoInputProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What needs to be done?"
        className="flex-1 px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-800 placeholder-gray-400 
                   focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent
                   shadow-sm transition-all duration-200"
      />
      <button
        type="submit"
        className="px-5 py-3 bg-violet-500 hover:bg-violet-600 active:bg-violet-700 text-white rounded-xl 
                   font-medium shadow-sm shadow-violet-200 hover:shadow-md hover:shadow-violet-200 
                   transition-all duration-200 flex items-center gap-2"
      >
        <Plus size={18} strokeWidth={2.5} />
        <span className="hidden sm:inline">Add</span>
      </button>
    </form>
  );
}
