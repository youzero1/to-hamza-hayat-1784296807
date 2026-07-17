import type { FilterType } from "../types/todo";

interface TodoFiltersProps {
  filter: FilterType;
  setFilter: (f: FilterType) => void;
  activeCount: number;
  completedCount: number;
  onClearCompleted: () => void;
}

const filters: { key: FilterType; label: string }[] = [
  { key: "all", label: "All" },
  { key: "active", label: "Active" },
  { key: "completed", label: "Done" },
];

export default function TodoFilters({
  filter,
  setFilter,
  activeCount,
  completedCount,
  onClearCompleted,
}: TodoFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
      {/* Filter Tabs */}
      <div className="flex bg-white/10 rounded-xl p-1 gap-1">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              filter === f.key
                ? "bg-white text-purple-700 shadow-sm"
                : "text-white/60 hover:text-white hover:bg-white/10"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Info & Clear */}
      <div className="flex items-center gap-4">
        <span className="text-white/50 text-sm">
          {activeCount} item{activeCount !== 1 ? "s" : ""} left
        </span>
        {completedCount > 0 && (
          <button
            onClick={onClearCompleted}
            className="text-sm text-white/40 hover:text-red-300 transition-colors"
          >
            Clear completed
          </button>
        )}
      </div>
    </div>
  );
}
