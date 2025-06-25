import { useEffect, useState } from 'react';

import { useTasks } from '@/entities/task/model/hooks/useTasks';

import TodoItem from '@components/TodoItem/TodoItem';

function App() {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskIdInput, setTaskIdInput] = useState('');
  const { tasks, removeTaskById, currentTask, fetchTasks, loading, error, fetchTaskById, addTask } = useTasks();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleCreateTask = async () => {
    if (!taskTitle.trim()) {
      alert('Пожалуйста, введите название задачи');
      return;
    }

    try {
      await addTask({
        title: taskTitle,
        description: taskDescription
      });
      setTaskTitle('');
      setTaskDescription('');
    } catch (err) {
      console.error('Ошибка при создании задачи:', err);
    }
  };

  const handleGetTaskById = async () => {
    if (!taskIdInput.trim()) {
      alert('Пожалуйста, введите ID задачи');
      return;
    }

    try {
      await fetchTaskById(taskIdInput);
      setTaskIdInput('');
    } catch (err) {
      console.error('Ошибка при поиске задачи:', err);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmation = window.confirm('Вы уверены, что хотите удалить задачу?');
    if (confirmation) {
      try {
        await removeTaskById(id);
        await fetchTasks();
      } catch (err) {
        console.error('Ошибка при удалении задачи:', err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 to-emerald-400 py-10 px-4">
      <div className="max-w-6xl mx-auto my-3" style={{ minHeight: '50px' }}>
        {loading && <div className="bg-white p-6 rounded-lg shadow-xl">Загрузка...</div>}

        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">Ошибка: {error}</div>}
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white shadow-lg rounded-3xl p-8">
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">REACT TODO LIST</h1>

          <div className="flex flex-col gap-2">
            <input
              value={taskTitle}
              type="text"
              placeholder="Введите название задачи"
              className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setTaskTitle(e.target.value)}
            />
            <input
              value={taskDescription}
              type="text"
              placeholder="Введите описание задачи"
              className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setTaskDescription(e.target.value)}
            />
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors" onClick={handleCreateTask}>
              Добавить
            </button>
          </div>

          {tasks.length > 0 && (
            <ul className="mt-6 space-y-2">
              {tasks.map((todo) => (
                <TodoItem key={todo.id} todo={todo} onDelete={() => handleDelete(todo.id!.toString())} />
              ))}
            </ul>
          )}
        </div>

        <div className="bg-white shadow-lg rounded-3xl p-8 h-fit">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Поиск задачи</h2>

          <div className="flex">
            <input
              value={taskIdInput}
              type="text"
              placeholder="Введите ID задачи"
              className="flex-grow px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setTaskIdInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleGetTaskById()}
            />
            <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-r-lg transition-colors" onClick={handleGetTaskById}>
              Найти
            </button>
          </div>

          {currentTask && (
            <div className="mt-6 p-4 border rounded-lg bg-gray-50">
              <h3 className="font-bold text-lg mb-2">{currentTask.title}</h3>
              <p className="text-gray-600 mb-2">{currentTask.description || 'Нет описания'}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
