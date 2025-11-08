import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import { type DataPoint } from '../../services/apiService'; 

interface MetricChartProps {
  data: DataPoint[];
  title: string;
}

const MetricChart: React.FC<MetricChartProps> = ({ data, title }) => {

  const chartOptions = useMemo(() => {
    const formattedData = data.map(point => [
      new Date(point.timestamp).toLocaleTimeString(),
      point.metricA,
    ]);

    return {
      backgroundColor: 'transparent',
      title: { 
        text: title,
        left: 'center',
        textStyle: {
          color: '#ffffff',
          fontSize: 18,
          fontWeight: 600
        }
      },
      tooltip: { 
        trigger: 'axis',
        axisPointer: { 
          type: 'cross',
          crossStyle: {
            color: '#6366f1'
          }
        },
        backgroundColor: 'rgba(26, 26, 46, 0.95)',
        borderColor: '#6366f1',
        borderWidth: 1,
        textStyle: {
          color: '#ffffff'
        }
      },
      legend: { 
        data: ['Metric A'],
        textStyle: {
          color: '#a0aec0'
        },
        top: 40
      },
      grid: { 
        left: '3%', 
        right: '4%', 
        bottom: '15%', 
        top: '20%',
        containLabel: true 
      },
      xAxis: {
        type: 'category', 
        boundaryGap: false,
        name: 'Time',
        nameTextStyle: {
          color: '#a0aec0'
        },
        axisLabel: {
          color: '#a0aec0',
          showMaxLabel: true,
          interval: Math.floor(data.length / 10) || 1,
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.1)'
          }
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.05)'
          }
        }
      },
      yAxis: {
        type: 'value',
        name: 'Value',
        nameTextStyle: {
          color: '#a0aec0'
        },
        axisLabel: {
          color: '#a0aec0'
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.1)'
          }
        },
        splitLine: {
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.05)'
          }
        }
      },
      dataZoom: [
        { 
          type: 'inside', 
          start: 0, 
          end: 10,
          filterMode: 'none'
        },
        { 
          start: 0, 
          end: 10,
          height: 30,
          bottom: 10,
          textStyle: {
            color: '#a0aec0'
          },
          borderColor: 'rgba(255, 255, 255, 0.1)',
          fillerColor: 'rgba(99, 102, 241, 0.2)',
          handleStyle: {
            color: '#6366f1'
          }
        }
      ],
      series: [
        {
          name: 'Metric A',
          type: 'line',
          data: formattedData,
          smooth: true,
          showSymbol: false,
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(99, 102, 241, 0.3)' },
                { offset: 1, color: 'rgba(99, 102, 241, 0.05)' }
              ]
            }
          },
          lineStyle: {
            color: '#6366f1',
            width: 2
          },
          emphasis: {
            focus: 'series',
            lineStyle: {
              width: 3
            }
          }
        },
      ],
    };
  }, [data, title]); 

  return (
    <div style={{ 
      width: '100%', 
      height: 400,
      background: 'var(--bg-secondary)',
      borderRadius: '8px',
      padding: '1rem',
      border: '1px solid var(--border-color)'
    }}>
      <ReactECharts 
        option={chartOptions} 
        style={{ height: '100%', width: '100%' }}
        notMerge={true} 
        lazyUpdate={true} 
      />
    </div>
  );
};

export default MetricChart;