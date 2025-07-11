import { useCallback, useReducer } from 'react';

import { parseError } from '@/entities/shared/utils/parseError';
import { createTask, deleteTaskById, getTaskById, getTasks } from '@/entities/task/api/taskApi';
import { tasksReducer } from '@/entities/task/model/tasksReducer';
import type { ITask, TTaskState } from '@/entities/task/types';

const initialState: TTaskState = {
  tasks: [],
  currentTask: null,
  loading: false,
  error: null
};

export function useTasks() {
  const [state, dispatch] = useReducer(tasksReducer, initialState);
  const { tasks, currentTask, loading, error } = state;

  // Получить все задачи
  const fetchTasks = useCallback(async () => {
    dispatch({ type: 'FETCH_START' });
    try {
      const data: ITask[] = await getTasks();
      dispatch({ type: 'FETCH_SUCCESS', payload: data });
      return data;
    } catch (e) {
      const error = parseError(e);
      dispatch({ type: 'FETCH_ERROR', payload: error });
      throw error;
    }
  }, []);

  // Получить задачу по id
  const fetchTaskById = useCallback(async (id: string) => {
    dispatch({ type: 'FETCH_START' });
    try {
      const data: ITask = await getTaskById(id);
      dispatch({ type: 'FETCH_ONE_SUCCESS', payload: data });
    } catch (e) {
      const error = parseError(e);
      dispatch({ type: 'FETCH_ERROR', payload: error });
      throw error;
    }
  }, []);

  // Удалить задачу по id (и обновить список)
  const removeTaskById = useCallback(
    async (id: string) => {
      dispatch({ type: 'FETCH_START' });
      try {
        await deleteTaskById(id);
        await fetchTasks(); // чтобы после удаления обновить список
      } catch (e) {
        const error = parseError(e);
        dispatch({ type: 'FETCH_ERROR', payload: error });
        throw error;
      }
    },
    [fetchTasks]
  );

  // Создать задачу (и обновить список)
  const addTask = useCallback(
    async (body: Omit<ITask, 'id'>) => {
      dispatch({ type: 'FETCH_START' });
      try {
        await createTask(body);
        return await fetchTasks();
      } catch (e) {
        const error = parseError(e);
        dispatch({ type: 'FETCH_ERROR', payload: error });
        throw error;
      }
    },
    [fetchTasks]
  );

  return {
    tasks,
    currentTask,
    loading,
    error,
    fetchTasks,
    fetchTaskById,
    removeTaskById,
    addTask
  };
}
