import { type DataPoint } from './apiService'; 

export function filterDataByMetricA(data: DataPoint[], threshold: number): DataPoint[] {
  console.log(`[Worker] Starting filter operation on ${data.length} points...`);
  
  const filteredData = data.filter(point => point.metricA >= threshold);
  
  console.log(`[Worker] Filter complete. Result size: ${filteredData.length}`);
  
  return filteredData;
}