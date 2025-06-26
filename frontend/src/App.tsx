import { useEffect, useState } from 'react';

import { useTasks } from '@/entities/task/model/hooks/useTasks';

import TaskCreate from '@components/TaskCreate/TaskCreate';
import TaskInfo from '@components/TaskInfo/TaskInfo';
import TaskItem from '@components/TaskItem/TaskItem';
import TaskSearch from '@components/TaskSearch/TaskSearch';

export default function App() {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskIdInput, setTaskIdInput] = useState('');
  const { tasks, removeTaskById, currentTask, fetchTasks, loading, error, fetchTaskById, addTask } = useTasks();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  async function handleCreateTask() {
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
  }

  async function handleGetTaskById() {
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
  }

  async function handleDelete(id: string) {
    const confirmation = window.confirm('Вы уверены, что хотите удалить задачу?');
    if (confirmation) {
      try {
        await removeTaskById(id);
        await fetchTasks();
      } catch (err) {
        console.error('Ошибка при удалении задачи:', err);
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 to-emerald-400 py-10 px-4">
      <div className="max-w-6xl mx-auto my-3" style={{ minHeight: '50px' }}>
        {loading && <div className="bg-white p-6 rounded-lg shadow-xl">Загрузка...</div>}

        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">Ошибка: {error}</div>}
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white shadow-lg rounded-3xl p-8">
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">REACT TODO LIST</h1>

          {
            <TaskCreate
              title={taskTitle}
              description={taskDescription}
              setTitle={setTaskTitle}
              setDescription={setTaskDescription}
              onCreate={handleCreateTask}
            />
          }

          {tasks.length > 0 && (
            <ul className="mt-6 space-y-2">
              {tasks.map((task) => (
                <TaskItem key={task.id} task={task} onDelete={() => handleDelete(task.id!.toString())} />
              ))}
            </ul>
          )}
        </div>

        <div className="bg-white shadow-lg rounded-3xl p-8 h-fit">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Поиск задачи</h2>

          {<TaskSearch inputValue={taskIdInput} setInputValue={setTaskIdInput} onSearch={handleGetTaskById} />}

          {currentTask && <TaskInfo task={currentTask} />}
        </div>
      </div>
    </div>
  );
}
