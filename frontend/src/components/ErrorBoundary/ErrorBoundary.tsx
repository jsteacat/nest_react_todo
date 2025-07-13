import type { ReactNode } from 'react';
import { ErrorBoundary as CustomErrorBoundary } from 'react-error-boundary';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
      <h2 className="font-bold text-lg">Что-то пошло не так</h2>
      <p className="whitespace-pre-wrap">{error.message}</p>
      <button onClick={resetErrorBoundary} className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
        Попробовать снова
      </button>
    </div>
  );
}

function ErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <CustomErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, info) => {
        console.error('ErrorBoundary caught:', error, info);
      }}
    >
      {children}
    </CustomErrorBoundary>
  );
}

export default ErrorBoundary;
