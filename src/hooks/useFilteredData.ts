import { useState, useRef, useEffect } from 'react';
import { type DataPoint } from '../services/apiService';
import { filterDataOffThread } from '../services/workerService';
import debounce from 'lodash/debounce'; 

export const useFilteredData = (rawData: DataPoint[]) => {
  const [filteredData, setFilteredData] = useState<DataPoint[]>(rawData);
  const [filterThreshold, setFilterThreshold] = useState<number>(0);
  const [isFiltering, setIsFiltering] = useState<boolean>(false);

  // Use ref to store the debounced function to avoid recreating it
  const debouncedFilterCallRef = useRef(
    debounce((data: DataPoint[], threshold: number) => {
      if (!data || data.length === 0) return;

      setIsFiltering(true);
      filterDataOffThread(data, threshold)
        .then(result => {
          setFilteredData(result);
        })
        .catch(error => {
          console.error("Worker filtering failed:", error);
          setFilteredData(data); 
        })
        .finally(() => {
          setIsFiltering(false);
        });
    }, 500)
  );

  useEffect(() => {
    setFilteredData(rawData);
  }, [rawData]);

  useEffect(() => {
    if (rawData && rawData.length > 0) {
      debouncedFilterCallRef.current(rawData, filterThreshold);
    }
  }, [rawData, filterThreshold]);

  return {
    filteredData,
    filterThreshold,
    setFilterThreshold,
    isFiltering,
  };
};