'use client';
import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { useEffect, useState } from 'react';
import { IDataParticipant } from '@/core/services/domain/model/IParticipant';

export default function BarsDataset({ data }: { data: IDataParticipant[] }) {
  const [chartDimensions, setChartDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setChartDimensions({
        width: window.innerWidth * 0.8, // 80% of the screen width
        height: window.innerHeight * 0.5, // 80% of the screen height
      });
    };

    // Initial dimensions on mount
    handleResize();

    // Event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const filteredData = data.reduce(
    (acc, curr) => {
      if (curr.protection_period.includes('1 Bulan')) {
        acc['1 Bulan']++;
      } else if (curr.protection_period.includes('3 Bulan')) {
        acc['3 Bulan']++;
      } else if (curr.protection_period.includes('6 Bulan')) {
        acc['6 Bulan']++;
      }
      return acc;
    },
    { '1 Bulan': 0, '3 Bulan': 0, '6 Bulan': 0 }
  );

  // Function to get color based on index
  const getColor = (index: number) => {
    const colors = ['#FF5733', '#33FF57', '#5733FF'];
    return colors[index % colors.length];
  };

  const dataset = Object.entries(filteredData).map(([month, total], index) => ({
    month,
    total,
    color: getColor(index),
  }));

  const valueFormatter = (value: number) => `${value} Peserta`;

  return (
    <div style={{ width: chartDimensions.width, height: chartDimensions.height }}>
      <BarChart
        dataset={dataset}
        xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
        series={[{ dataKey: 'total', label: 'Peserta', valueFormatter }]}
        colors={['#1e3a8a']}
      />
    </div>
  );
}
