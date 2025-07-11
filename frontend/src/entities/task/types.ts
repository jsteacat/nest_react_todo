import type React from 'react';

export interface ITask {
  id?: number;
  title: string;
  description: string;
}

export interface ITaskCreateProps {
  title: string;
  description: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  onCreate: () => void;
}

export interface ITaskItemProps {
  task: ITask;
  onDelete: () => void;
}

export interface TaskSearchProps {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  onSearch: () => void;
}

export type TTaskState = {
  tasks: ITask[];
  currentTask: ITask | null;
  loading: boolean;
  error: string | null;
};

export type TTaskAction =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: ITask[] }
  | { type: 'FETCH_ONE_SUCCESS'; payload: ITask }
  | { type: 'FETCH_ERROR'; payload: string };
