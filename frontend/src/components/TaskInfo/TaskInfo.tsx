import type { ITask } from '@/entities/task/types/types';

export default function TaskInfo({ task }: { task: ITask }) {
  return (
    <div className="mt-6 p-4 border rounded-lg bg-gray-50">
      <h3 className="font-bold text-lg mb-2">{task.title}</h3>
      <p className="text-gray-600 mb-2">{task.description || 'Нет описания'}</p>
    </div>
  );
}
