import { CheckCircle2 } from "lucide-react";
import { useTodos } from "../hooks/useTodos";
import TodoInput from "../components/TodoInput";
import TodoItem from "../components/TodoItem";
import TodoFilters from "../components/TodoFilters";
import EmptyState from "../components/EmptyState";

export default function Home() {
  const {
    todos,
    allTodos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    activeCount,
    completedCount,
  } = useTodos();

  return (
    <div className="min-h-screen flex items-start justify-center px-4 py-10 sm:py-16">
      <div className="w-full max-w-xl">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-white/15 rounded-2xl backdrop-blur-sm">
            <CheckCircle2 size={28} className="text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Todo App
            </h1>
            <p className="text-white/50 text-sm">
              Stay organized, get things done
            </p>
          </div>
        </div>

        {/* Input */}
        <div className="mb-6">
          <TodoInput onAdd={addTodo} />
        </div>

        {/* Filters (only when there are todos) */}
        {allTodos.length > 0 && (
          <div className="mb-5">
            <TodoFilters
              filter={filter}
              setFilter={setFilter}
              activeCount={activeCount}
              completedCount={completedCount}
              onClearCompleted={clearCompleted}
            />
          </div>
        )}

        {/* Todo List */}
        <div className="space-y-2">
          {todos.length > 0 ? (
            todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onEdit={editTodo}
              />
            ))
          ) : (
            <EmptyState filter={filter} hasTodos={allTodos.length > 0} />
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-white/20 text-xs mt-10">
          Double-click a todo to edit · Saved in your browser
        </p>
      </div>
    </div>
  );
}
