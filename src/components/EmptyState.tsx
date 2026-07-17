import { ClipboardList } from 'lucide-react';
import type { FilterType } from '../types/todo';

interface EmptyStateProps {
  filter: FilterType;
}

export default function EmptyState({ filter }: EmptyStateProps) {
  const messages: Record<FilterType, { title: string; subtitle: string }> = {
    all: { title: 'No todos yet', subtitle: 'Add your first task above to get started!' },
    active: { title: 'All done!', subtitle: 'You\'ve completed everything. Nice work! 🎉' },
    completed: { title: 'Nothing completed yet', subtitle: 'Start checking off some tasks!' },
  };

  const msg = messages[filter];

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="w-14 h-14 rounded-2xl bg-violet-50 flex items-center justify-center mb-4">
        <ClipboardList size={28} className="text-violet-400" />
      </div>
      <p className="text-gray-700 font-medium">{msg.title}</p>
      <p className="text-gray-400 text-sm mt-1">{msg.subtitle}</p>
    </div>
  );
}
