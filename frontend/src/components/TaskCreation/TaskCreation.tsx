import type { ITaskCreateProps } from '@/entities/task/types';

export default function TaskCreation({ title, description, setTitle, setDescription, onCreate }: ITaskCreateProps) {
  return (
    <div className="flex flex-col gap-2">
      <input
        value={title}
        type="text"
        placeholder="Введите название задачи"
        className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        value={description}
        type="text"
        placeholder="Введите описание задачи"
        className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => setDescription(e.target.value)}
      />
      <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors" onClick={onCreate}>
        Добавить
      </button>
    </div>
  );
}
