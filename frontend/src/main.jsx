import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import { Toaster } from './components/ui/sonner';
import { AuthProvider } from './providers/AuthProvider';
import PageLoader from './components/loader/PageLoader';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(

  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <Suspense fallback={<PageLoader />}>
          <App />
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
    <Toaster position="top-right" richColors theme="light" />
  </QueryClientProvider>
);
