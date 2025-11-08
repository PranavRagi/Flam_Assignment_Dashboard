import * as Comlink from 'comlink';

const FilterWorker = new Worker(new URL('./dataWorker', import.meta.url), {
  type: 'module',
});

const workerApi = Comlink.wrap<{ 
  filterDataByMetricA: (data: any[], threshold: number) => Promise<any[]> 
}>(FilterWorker);

export const filterDataOffThread = workerApi.filterDataByMetricA;

window.addEventListener('beforeunload', () => {
  FilterWorker.terminate();
});