import React from 'react';

import type { TaskSearchProps } from '@/entities/task/types/types';

export default function TaskSearch({ inputValue, setInputValue, onSearch }: TaskSearchProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="flex">
      <input
        value={inputValue}
        type="text"
        placeholder="Введите ID задачи"
        className="flex-grow px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-r-lg transition-colors" onClick={onSearch}>
        Найти
      </button>
    </div>
  );
}
