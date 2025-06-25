import DeleteIcon from '@/assets/icons/delete.svg';
import type { ITaskItemProps } from '@/entities/task/types/types';

function TodoItem({ todo, onDelete }: ITaskItemProps) {
  return (
    <li className="p-3 rounded-lg bg-slate-100 border border-gray-200">
      <div className="flex items-center">
        <span className="flex-grow">{todo.title}</span>
        <button className="ml-2 border-none cursor-pointer" onClick={onDelete}>
          <img src={DeleteIcon} style={{ width: 36 }} alt="Delete" />
        </button>
      </div>
    </li>
  );
}

export default TodoItem;
