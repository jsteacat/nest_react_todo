export interface ITask {
  id?: number;
  title: string;
  description: string;
}

export interface ITaskItemProps {
  todo: ITask;
  onDelete: () => void;
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
