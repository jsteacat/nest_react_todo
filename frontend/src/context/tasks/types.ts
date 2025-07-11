import type { Dispatch, SetStateAction } from 'react';

import type { ITask } from '@/entities/task/types';

export interface TasksContextType {
  tasks: ITask[];
  setTasks: Dispatch<SetStateAction<ITask[]>>;
}
