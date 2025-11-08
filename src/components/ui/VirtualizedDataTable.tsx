import React from 'react';
import { List, type RowComponentProps } from 'react-window';
import { type DataPoint } from '../../services/apiService';

interface RowExtraProps {
  data: DataPoint[];
}

type RowProps = RowComponentProps<RowExtraProps>;

const Row = ({ index, style, data }: RowProps): React.ReactElement => {
  const item = data[index];
  
  if (!item) {
    return <div style={style} />;
  }

  const isEven = index % 2 === 0;

  return (
    <div 
      style={{ 
        ...style, 
        display: 'flex', 
        borderBottom: '1px solid var(--border-color)',
        background: isEven ? 'var(--bg-card)' : 'var(--bg-secondary)',
        transition: 'background 0.2s'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'var(--bg-card-hover)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = isEven ? 'var(--bg-card)' : 'var(--bg-secondary)';
      }}
    >
      {/* Table Cells */}
      <div style={cellStyle(1)}>{index + 1}</div>
      <div style={cellStyle(4)}>{new Date(item.timestamp).toLocaleString()}</div>
      <div style={cellStyle(2)}>{item.metricA.toFixed(2)}</div>
      <div style={cellStyle(2)}>{item.metricB.toFixed(2)}</div>
      <div style={cellStyle(3)}>
        <span style={{
          display: 'inline-block',
          padding: '0.25rem 0.75rem',
          borderRadius: '12px',
          background: 'rgba(99, 102, 241, 0.1)',
          color: 'var(--accent-primary)',
          fontSize: '0.875rem',
          fontWeight: 500
        }}>
          {item.category}
        </span>
      </div>
    </div>
  );
};

const cellStyle = (flex: number): React.CSSProperties => ({
  flex: flex,
  padding: '12px 16px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  display: 'flex',
  alignItems: 'center',
  color: 'var(--text-primary)',
  fontSize: '0.9rem'
});

interface VirtualizedDataTableProps {
  data: DataPoint[];
  height: number;
  width: number;
}

const VirtualizedDataTable: React.FC<VirtualizedDataTableProps> = ({ data, height, width }) => {
  
  const ROW_HEIGHT = 48; 
  
  const Header = (
    <div style={{ 
      display: 'flex', 
      fontWeight: 600,
      background: 'var(--bg-secondary)',
      borderBottom: '2px solid var(--accent-primary)',
      padding: '12px 16px',
      fontSize: '0.875rem',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      color: 'var(--text-secondary)',
      position: 'sticky',
      top: 0,
      zIndex: 10
    }}>
      <div style={cellStyle(1)}>#</div>
      <div style={cellStyle(4)}>Timestamp</div>
      <div style={cellStyle(2)}>Metric A</div>
      <div style={cellStyle(2)}>Metric B</div>
      <div style={cellStyle(3)}>Category</div>
    </div>
  );

  return (
    <div style={{ 
      border: '1px solid var(--border-color)', 
      borderRadius: '12px',
      overflow: 'hidden',
      background: 'var(--bg-card)',
      boxShadow: 'var(--shadow-md)'
    }}>
      {Header}
      {/* The main virtualized list */}
      <List
        defaultHeight={height}
        rowCount={data.length}
        rowHeight={ROW_HEIGHT}
        rowComponent={Row}
        rowProps={{ data }}
        style={{ height, width, overflow: 'auto' }}
        overscanCount={4}
      />
    </div>
  );
};

export default VirtualizedDataTable;