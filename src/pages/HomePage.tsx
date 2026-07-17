import { useState, useEffect, useMemo } from 'react';
import { ListTodo } from 'lucide-react';
import TodoInput from '../components/TodoInput';
import TodoItem from '../components/TodoItem';
import TodoFilters from '../components/TodoFilters';
import EmptyState from '../components/EmptyState';
import type { Todo, FilterType } from '../types/todo';

const STORAGE_KEY = 'todo-app-todos';

function loadTodos(): Todo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveTodos(todos: Todo[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

export default function HomePage() {
  const [todos, setTodos] = useState<Todo[]>(loadTodos);
  const [filter, setFilter] = useState<FilterType>('all');

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  const addTodo = (text: string) => {
    setTodos((prev) => [
      { id: crypto.randomUUID(), text, completed: false, createdAt: Date.now() },
      ...prev,
    ]);
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((t) => !t.completed));
  };

  const activeCount = useMemo(() => todos.filter((t) => !t.completed).length, [todos]);
  const completedCount = useMemo(() => todos.filter((t) => t.completed).length, [todos]);

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter((t) => !t.completed);
      case 'completed':
        return todos.filter((t) => t.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50">
      {/* Header */}
      <div className="pt-12 pb-8 px-4 text-center">
        <div className="inline-flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-violet-500 flex items-center justify-center shadow-lg shadow-violet-200">
            <ListTodo size={22} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Todo App</h1>
        </div>
        <p className="text-gray-500 text-sm">Stay organized, get things done</p>
      </div>

      {/* Main content */}
      <div className="max-w-lg mx-auto px-4 pb-16">
        {/* Input */}
        <div className="mb-6">
          <TodoInput onAdd={addTodo} />
        </div>

        {/* Filters (show only when there are todos) */}
        {todos.length > 0 && (
          <div className="mb-4">
            <TodoFilters
              filter={filter}
              onFilterChange={setFilter}
              totalCount={todos.length}
              activeCount={activeCount}
              completedCount={completedCount}
              onClearCompleted={clearCompleted}
            />
          </div>
        )}

        {/* Todo list */}
        {filteredTodos.length > 0 ? (
          <div className="space-y-2">
            {filteredTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />
            ))}
          </div>
        ) : (
          <EmptyState filter={filter} />
        )}

        {/* Progress bar */}
        {todos.length > 0 && (
          <div className="mt-8">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
              <span>Progress</span>
              <span>{todos.length > 0 ? Math.round((completedCount / todos.length) * 100) : 0}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-violet-500 to-purple-500 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${todos.length > 0 ? (completedCount / todos.length) * 100 : 0}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
