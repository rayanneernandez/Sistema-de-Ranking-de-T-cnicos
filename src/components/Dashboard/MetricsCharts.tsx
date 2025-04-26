import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { useAppContext } from '../../context/AppContext';
import { format, subDays, eachDayOfInterval } from 'date-fns';
import { ptBR } from 'date-fns/locale';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MetricsCharts: React.FC = () => {
  const { technicians, dateRange } = useAppContext();

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#e5e7eb',
        },
      },
    },
    scales: {
      y: {
        grid: {
          color: '#374151',
        },
        ticks: {
          color: '#e5e7eb',
        },
      },
      x: {
        grid: {
          color: '#374151',
        },
        ticks: {
          color: '#e5e7eb',
        },
      },
    },
  };

  // Calculate average metrics per technician
  const averageMetrics = {
    avgServiceTime: technicians.reduce((acc, tech) => acc + tech.avgServiceTime, 0) / technicians.length,
    firstResponseTime: technicians.reduce((acc, tech) => acc + tech.firstResponseTime, 0) / technicians.length,
    rating: technicians.reduce((acc, tech) => acc + tech.rating, 0) / technicians.length,
  };

  // Generate labels for the last 7 days
  const today = new Date();
  const last7Days = eachDayOfInterval({
    start: subDays(today, 6),
    end: today,
  });

  const labels = last7Days.map(date => format(date, 'dd/MM', { locale: ptBR }));

  // Generate random data for demonstration
  // In a real application, this would come from actual historical data
  const generateRandomData = (baseline: number, variance: number) => {
    return last7Days.map(() => baseline + (Math.random() - 0.5) * variance);
  };

  const serviceTimeData = {
    labels,
    datasets: [
      {
        label: 'Tempo Médio de Atendimento (min)',
        data: generateRandomData(averageMetrics.avgServiceTime, 20),
        borderColor: '#3b82f6',
        backgroundColor: '#3b82f680',
      },
    ],
  };

  const responseTimeData = {
    labels,
    datasets: [
      {
        label: 'Tempo Médio de Primeira Resposta (min)',
        data: generateRandomData(averageMetrics.firstResponseTime, 10),
        borderColor: '#10b981',
        backgroundColor: '#10b98180',
      },
    ],
  };

  // Limit to 7 technicians and use numbered labels
  const limitedTechnicians = technicians.slice(0, 7);
  const technicianLabels = limitedTechnicians.map((_, index) => `Técnico ${index + 1}`);

  const ratingData = {
    labels: technicianLabels,
    datasets: [
      {
        label: 'Avaliação Média',
        data: limitedTechnicians.map(tech => tech.rating),
        backgroundColor: '#6366f1',
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <div className="bg-gray-800 rounded-lg shadow-md p-4">
        <h3 className="text-lg font-semibold text-white mb-4">Tempo Médio de Atendimento</h3>
        <div className="h-[300px]">
          <Line options={chartOptions} data={serviceTimeData} />
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg shadow-md p-4">
        <h3 className="text-lg font-semibold text-white mb-4">Tempo de Primeira Resposta</h3>
        <div className="h-[300px]">
          <Line options={chartOptions} data={responseTimeData} />
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg shadow-md p-4 lg:col-span-2">
        <h3 className="text-lg font-semibold text-white mb-4">Avaliações por Técnico</h3>
        <div className="h-[300px]">
          <Bar options={chartOptions} data={ratingData} />
        </div>
      </div>
    </div>
  );
};

export default MetricsCharts;

