import { createRoot } from 'react-dom/client';

import './index.css';
import App from '@/App';
import TasksContextProvider from '@/context/tasks';

createRoot(document.getElementById('root')!).render(
  <TasksContextProvider>
    <App />
  </TasksContextProvider>
);
