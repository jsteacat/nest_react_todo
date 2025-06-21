import { useEffect } from 'react';

import './App.css';
import { useTasks } from '@/entities/task/model/hooks/useTasks';

function App() {
  const { tasks, fetchTasks, loading, error, fetchTaskById, addTask, removeTaskById } = useTasks();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const getById = async (id: string) => {
    await fetchTaskById(id);
  };

  const create = async () => {
    await addTask({ title: 'title', description: 'description' });
  };

  const deleteTask = async () => {
    const confirmation = window.prompt('Для удаления задачи введите ID:');
    await removeTaskById(confirmation?.toLowerCase().toString() as string);
  };

  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div>Что-то сломалось...</div>}
      <div>
        {tasks.map((task) => (
          <ul key={task.id}>
            <li>{task.title}</li>
            <li>{task.description}</li>
          </ul>
        ))}
        <button onClick={() => getById('15')}>Получить по ID таску №15</button>
        <button onClick={create}>Создать новую таску</button>
        <button onClick={deleteTask}>Удалить таску по ID</button>
      </div>
    </>
  );
}

export default App;
