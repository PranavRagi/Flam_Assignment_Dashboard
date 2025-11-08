import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import DashboardPage from './components/dashboard/DashboardPage'; 

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Configuration for caching and performance
      staleTime: 1000 * 60 * 5, // Data is fresh for 5 minutes
      
      // FIX: Rename cacheTime to gcTime for TanStack Query v5+
      gcTime: 1000 * 60 * 60 * 24, // Inactive data remains in cache for 24 hours before garbage collection
      
      refetchOnWindowFocus: false, 
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <DashboardPage />
    </QueryClientProvider>
  );
}

export default App;