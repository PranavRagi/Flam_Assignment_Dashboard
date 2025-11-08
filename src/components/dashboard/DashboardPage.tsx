import React, { useMemo } from 'react';
import { useDashboardData } from '../../hooks/useDataQuery'; 
import { useFilteredData } from '../../hooks/useFilteredData'; 
import MetricChart from '../../features/data_viz/MetricChart';
import VirtualizedDataTable from '../../components/ui/VirtualizedDataTable'; 

const DashboardPage: React.FC = () => {
  const { data: rawData, isLoading, isError, error } = useDashboardData();
  
  const { 
    filteredData, 
    filterThreshold, 
    setFilterThreshold, 
    isFiltering 
  } = useFilteredData(rawData || []);

  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '100vh',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <div className="loading" style={{ fontSize: '3rem' }}>📊</div>
        <p style={{ fontSize: '1.2em', color: 'var(--text-secondary)' }}>
          Loading critical data... Please wait.
        </p>
      </div>
    );
  }

  if (isError) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred.';
    return (
      <div style={{ 
        padding: '2rem',
        maxWidth: '600px',
        margin: '2rem auto'
      }}>
        <div className="card" style={{ 
          borderColor: 'var(--error)',
          background: 'rgba(239, 68, 68, 0.1)'
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.75rem',
            marginBottom: '1rem'
          }}>
            <span style={{ fontSize: '1.5rem' }}>🚨</span>
            <h2 style={{ margin: 0, color: 'var(--error)' }}>Error fetching data</h2>
          </div>
          <p style={{ color: 'var(--text-secondary)', margin: 0 }}>{errorMessage}</p>
        </div>
      </div>
    );
  }

  if (!rawData || rawData.length === 0) {
     return (
       <div style={{ 
         padding: '2rem',
         maxWidth: '600px',
         margin: '2rem auto'
       }}>
         <div className="card" style={{ 
           borderColor: 'var(--warning)',
           background: 'rgba(245, 158, 11, 0.1)'
         }}>
           <div style={{ 
             display: 'flex', 
             alignItems: 'center', 
             gap: '0.75rem',
             marginBottom: '1rem'
           }}>
             <span style={{ fontSize: '1.5rem' }}>⚠️</span>
             <h2 style={{ margin: 0, color: 'var(--warning)' }}>No Data Available</h2>
           </div>
           <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
             Data is ready but empty. Check API service.
           </p>
         </div>
       </div>
     );
  }
  
  const rawDataCount = rawData.length.toLocaleString();
  const filteredDataCount = (filteredData?.length ?? 0).toLocaleString();

  return (
    <div style={{ 
      padding: '2rem',
      maxWidth: '1400px',
      margin: '0 auto',
      fontFamily: 'inherit'
    }}>
      {/* Header Section */}
      <div style={{ marginBottom: '2rem' }}>
        <h1>Performance Dashboard</h1>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '1rem',
          flexWrap: 'wrap'
        }}>
          <span className="status-badge success">
            <span style={{ 
              width: '8px', 
              height: '8px', 
              borderRadius: '50%', 
              background: 'var(--success)',
              display: 'inline-block'
            }}></span>
            Ready and Cached
          </span>
          <span style={{ color: 'var(--text-secondary)' }}>
            Raw Points: <strong style={{ color: 'var(--text-primary)' }}>{rawDataCount}</strong>
          </span>
        </div>
      </div>

      {/* Filter Control Card */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ marginTop: 0 }}>Web Worker Filtering Control</h2>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '1rem',
          flexWrap: 'wrap',
          marginBottom: '1rem'
        }}>
          <div style={{ flex: '1', minWidth: '200px' }}>
            <label htmlFor="filter-input" style={{ 
              display: 'block', 
              marginBottom: '0.5rem' 
            }}>
              Filter Metric A (Min Threshold: <strong>{filterThreshold}</strong>)
            </label>
            <input
              id="filter-input"
              type="number"
              value={filterThreshold}
              onChange={(e) => setFilterThreshold(Number(e.target.value))}
              disabled={isFiltering}
            />
          </div>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span className={`status-badge ${isFiltering ? 'warning' : 'success'}`}>
              <span style={{ 
                width: '8px', 
                height: '8px', 
                borderRadius: '50%', 
                background: isFiltering ? 'var(--warning)' : 'var(--success)',
                display: 'inline-block',
                animation: isFiltering ? 'pulse 1.5s ease-in-out infinite' : 'none'
              }}></span>
              {isFiltering ? 'Filtering in Web Worker (UI is free)' : 'Filtering Idle'}
            </span>
          </div>
        </div>
        <div style={{ 
          padding: '1rem',
          background: 'var(--bg-secondary)',
          borderRadius: '8px',
          border: '1px solid var(--border-color)'
        }}>
          <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
            Filtered Points: <strong style={{ 
              color: 'var(--accent-primary)', 
              fontSize: '1.1rem' 
            }}>{filteredDataCount}</strong>
          </p>
        </div>
      </div>
      
      {/* Chart Section */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ marginTop: 0 }}>
          Filtered Metric Trend ({filteredDataCount} Points)
        </h2>
        {filteredData && filteredData.length > 0 ? (
          <MetricChart data={filteredData} title={`Metric A (Threshold >= ${filterThreshold})`} />
        ) : (
          <div style={{ 
            padding: '3rem',
            textAlign: 'center',
            color: 'var(--text-muted)'
          }}>
            <p style={{ margin: 0 }}>No data points meet the current threshold filter for charting.</p>
          </div>
        )}
      </div>

      {/* Table Section */}
      
      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ marginTop: 0 }}>
          Virtualized Data Log ({filteredDataCount} Rows)
        </h2>
        <p style={{ 
          fontSize: '0.9em', 
          color: 'var(--text-muted)',
          marginBottom: '1rem'
        }}>
          Only visible rows are rendered for smooth scrolling performance on {filteredDataCount} records.
        </p>
        
        {filteredData && filteredData.length > 0 ? (
          <VirtualizedDataTable
            data={filteredData}
            height={400} 
            width={800}  
          />
        ) : (
          <div style={{ 
            padding: '3rem',
            textAlign: 'center',
            color: 'var(--text-muted)'
          }}>
            <p style={{ margin: 0 }}>No data available to display in the table.</p>
          </div>
        )}
      </div>

      {/* Raw Data Sample */}
      <div className="card">
        <h3 style={{ marginTop: 0 }}>Raw Data Sample (First Record)</h3>
        <pre style={{ 
          maxHeight: '200px', 
          overflowY: 'auto', 
          background: 'var(--bg-secondary)', 
          color: 'var(--text-primary)', 
          padding: '1rem',
          borderRadius: '8px',
          fontSize: '0.85em',
          border: '1px solid var(--border-color)',
          margin: 0
        }}>
          {JSON.stringify(rawData[0], null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default DashboardPage;