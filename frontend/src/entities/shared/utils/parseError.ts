import axios from 'axios';

export function parseError(e: unknown): string {
  if (axios.isAxiosError?.(e)) return e.response?.data?.message || e.message;
  if (e instanceof Error) return e.message;
  if (typeof e === 'string') return e;
  return 'Что-то пошло не так...';
}
