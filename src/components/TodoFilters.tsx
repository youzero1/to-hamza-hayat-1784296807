import type { FilterType } from '../types/todo';

interface TodoFiltersProps {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  totalCount: number;
  activeCount: number;
  completedCount: number;
  onClearCompleted: () => void;
}

const filters: { key: FilterType; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'completed', label: 'Completed' },
];

export default function TodoFilters({
  filter,
  onFilterChange,
  activeCount,
  completedCount,
  onClearCompleted,
}: TodoFiltersProps) {
  return (
    <div className="flex items-center justify-between flex-wrap gap-3">
      {/* Filter buttons */}
      <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => onFilterChange(f.key)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200
              ${filter === f.key
                ? 'bg-white text-violet-600 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
              }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Stats & clear */}
      <div className="flex items-center gap-3 text-xs text-gray-500">
        <span>{activeCount} item{activeCount !== 1 ? 's' : ''} left</span>
        {completedCount > 0 && (
          <button
            onClick={onClearCompleted}
            className="text-red-400 hover:text-red-600 transition-colors"
          >
            Clear completed
          </button>
        )}
      </div>
    </div>
  );
}
