import type { ITask } from '@/entities/task/types/types';

import { api } from './api';

export const getTasks = async () => (await api.get('/tasks')).data;

export const getTaskById = async (id: string) => (await api.get(`/tasks/${id}`)).data;

export const deleteTaskById = async (id: string) => (await api.delete(`/tasks/${id}`)).data;

export const createTask = async (body: ITask) => (await api.post('/tasks', body)).data;
