import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx' // Make sure this path is correct
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)


// import React from 'react';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import DashboardPage from './components/dashboard/DashboardPage'; 
// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       // Data is considered fresh for 5 minutes (staleTime)
//       staleTime: 1000 * 60 * 5, 
//       // Keep inactive data in cache for 24 hours (cacheTime)
//       cacheTime: 1000 * 60 * 60 * 24, 
//       // Prevents re-fetching when the user switches browser tabs
//       refetchOnWindowFocus: false, 
//     },
//   },
// });

// function App() {
//   return (
//     // 2. Wrap the entire application with QueryClientProvider
//     <QueryClientProvider client={queryClient}>
//       {/* This will be the main entry point for your dashboard content */}
//       <DashboardPage />
//       {/* Optional: ReactQueryDevtools can be added here for debugging */}
//     </QueryClientProvider>
//   );
// }

// export default App;