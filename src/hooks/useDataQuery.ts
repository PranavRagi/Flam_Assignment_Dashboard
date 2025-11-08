import { useQuery } from '@tanstack/react-query';
import { fetchDataMetrics, type DataPoint } from '../services/apiService';

// Define the query key for caching
const QUERY_KEY_DASHBOARD_DATA = 'dashboardMetrics';

export const useDashboardData = () => {
  // useQuery will automatically manage the loading state, error, and caching
  return useQuery<DataPoint[], Error>({
    queryKey: [QUERY_KEY_DASHBOARD_DATA], // Unique key for this data
    queryFn: () => fetchDataMetrics(15000), // Fetch 15,000 data points
    // Select option can be used here for light transformations if needed
  });
};