// Define a shape for our simulated data point
export interface DataPoint {
  timestamp: number;
  metricA: number;
  metricB: number;
  category: string;
}

// SIMULATED API CALL to generate a large dataset (10,000 points)
const generateMockData = (count: number): DataPoint[] => {
  const data: DataPoint[] = [];
  const now = Date.now();
  for (let i = 0; i < count; i++) {
    data.push({
      timestamp: now - (count - i) * 60000, // 1 minute interval
      metricA: Math.random() * 100,
      metricB: Math.random() * 50 + 20,
      category: i % 3 === 0 ? 'Group X' : (i % 3 === 1 ? 'Group Y' : 'Group Z'),
    });
  }
  return data;
};

// Main function to fetch the data
export const fetchDataMetrics = async (
  datasetSize: number = 10000 // Fetch 10k points by default
): Promise<DataPoint[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 500)); 
  
  // Return the generated data
  return generateMockData(datasetSize);
};