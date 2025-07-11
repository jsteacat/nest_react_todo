import type { TTaskAction, TTaskState } from '@/entities/task/types';

export function tasksReducer(state: TTaskState, action: TTaskAction): TTaskState {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, error: null, tasks: action.payload };
    case 'FETCH_ONE_SUCCESS':
      return { ...state, loading: false, error: null, currentTask: action.payload };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
