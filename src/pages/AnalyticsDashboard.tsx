import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Line, Pie, Bar } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend,
  ArcElement,
  BarElement
} from 'chart.js';
import { RootState, AppDispatch } from '../redux/store';
import { fetchAnalytics } from '../redux/actions/analyticsActions';

ChartJS.register(
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend,
  ArcElement,
  BarElement
);

const AnalyticsDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { 
    registrationTrend, 
    usersByRegion, 
    activeVsInactive 
  } = useSelector((state: RootState) => state.analytics);

  useEffect(() => {
    dispatch(fetchAnalytics());
  }, [dispatch]);

  const registrationData = {
    labels: registrationTrend.map(item => item.month),
    datasets: [{
      label: 'User Registrations',
      data: registrationTrend.map(item => item.users),
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  };

  const activeInactiveData = {
    labels: ['Active Users', 'Inactive Users'],
    datasets: [{
      data: [activeVsInactive.active, activeVsInactive.inactive],
      backgroundColor: ['#36A2EB', '#FF6384']
    }]
  };

  const regionData = {
    labels: usersByRegion.map(item => item.region),
    datasets: [{
      label: 'Users by Region',
      data: usersByRegion.map(item => item.count),
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)'
      ]
    }]
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Overview Cards */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-xl font-bold mb-4">Total Users</h3>
          <div className="text-3xl font-bold text-blue-500">
            {activeVsInactive.active + activeVsInactive.inactive}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-xl font-bold mb-4">Active Users</h3>
          <div className="text-3xl font-bold text-green-500">
            {activeVsInactive.active}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-xl font-bold mb-4">Inactive Users</h3>
          <div className="text-3xl font-bold text-red-500">
            {activeVsInactive.inactive}
          </div>
        </div>

        {/* Charts */}
        <div className="bg-white p-4 rounded-lg shadow col-span-full">
          <h3 className="text-xl font-bold mb-4">User Registration Trend</h3>
          <Line data={registrationData} />
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-xl font-bold mb-4">Active vs Inactive Users</h3>
          <Pie data={activeInactiveData} />
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-xl font-bold mb-4">Users by Region</h3>
          <Bar data={regionData} />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;