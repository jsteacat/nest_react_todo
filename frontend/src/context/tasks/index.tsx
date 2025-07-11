import React, { type ReactNode, createContext, useState } from 'react';

import type { TasksContextType } from '@/context/tasks/types';
import type { ITask } from '@/entities/task/types';

export const TasksContext = createContext<TasksContextType>({
  tasks: [],
  setTasks: () => {}
});

const TasksContextProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<ITask[]>([]);

  return <TasksContext.Provider value={{ tasks, setTasks }}>{children}</TasksContext.Provider>;
};

export default TasksContextProvider;
