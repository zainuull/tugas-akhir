import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { useEffect, useState } from 'react';

const dataset = [
  {
    jawa_barat: 59,
    jawa_tengah: 57,
    jawa_timur: 86,
    month: 'Jan',
  },
  {
    jawa_barat: 70,
    jawa_tengah: 77,
    jawa_timur: 40,
    month: 'Feb',
  },
  {
    jawa_barat: 44,
    jawa_tengah: 37,
    jawa_timur: 20,
    month: 'Mar',
  },
];

const valueFormatter = (value: number) => `${value} Peserta`;

export default function BarsDataset() {
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

  return (
    <div style={{ width: chartDimensions.width, height: chartDimensions.height }}>
      <BarChart
        dataset={dataset}
        xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
        series={[
          { dataKey: 'jawa_barat', label: 'Jawa Barat', valueFormatter },
          { dataKey: 'jawa_tengah', label: 'Jawa Tengah', valueFormatter },
          { dataKey: 'jawa_timur', label: 'Jawa Timur', valueFormatter },
        ]}
      />
    </div>
  );
}
