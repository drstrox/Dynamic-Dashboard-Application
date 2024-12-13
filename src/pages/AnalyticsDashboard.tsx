import React, { useEffect, useState } from 'react';
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
import { fetchUsers } from '../redux/actions/userActions';
import { motion } from 'framer-motion';

// Chart.js registration
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
  const { users, totalUsers } = useSelector((state: RootState) => state.users);

  // State for filters
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({
    start: '2024-01-01',
    end: '2024-06-30'
  });
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  // Tracking deleted users
  const [deletedUsers, setDeletedUsers] = useState<number>(0);

  useEffect(() => {
    dispatch(fetchAnalytics());
    dispatch(fetchUsers());
  }, [dispatch]);

  // Chart Data Configurations
  const registrationData = {
    labels: registrationTrend.map(item => item.month),
    datasets: [{
      label: 'User Registrations',
      data: registrationTrend.map(item => item.users),
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
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

  // Chart Options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'User Analytics'
      }
    }
  };

  // Filter handlers
  const handleDateRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDateRange(prev => ({ ...prev, [name]: value }));
  };

  const handleRegionFilter = (region: string) => {
    setSelectedRegion(region === selectedRegion ? null : region);
  };

  // Mock deleted users tracking (could be integrated with actual delete action)
  const handleUserDelete = () => {
    setDeletedUsers(prev => prev + 1);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-gradient-to-r from-gray-100 to-gray-200 min-h-screen"
    >
      {/* Filters Section */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-4">Analytics Filters</h3>
        <div className="flex flex-wrap gap-4 items-center">
          <div>
            <label className="block text-sm font-medium text-gray-700">Start Date</label>
            <input 
              type="date" 
              name="start"
              value={dateRange.start}
              onChange={handleDateRangeChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">End Date</label>
            <input 
              type="date" 
              name="end"
              value={dateRange.end}
              onChange={handleDateRangeChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Region</label>
            <div className="flex gap-2 mt-1">
              {usersByRegion.map(region => (
                <button
                  key={region.region}
                  onClick={() => handleRegionFilter(region.region)}
                  className={`px-3 py-1 rounded-full text-sm transition-all ${
                    selectedRegion === region.region 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {region.region}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <h3 className="text-xl font-bold mb-4">Total Users</h3>
          <div className="text-4xl font-bold text-blue-500">{totalUsers}</div>
        </motion.div>
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <h3 className="text-xl font-bold mb-4">Active Users</h3>
          <div className="text-4xl font-bold text-green-500">{activeVsInactive.active}</div>
        </motion.div>
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <h3 className="text-xl font-bold mb-4">Deleted Users</h3>
          <div className="text-4xl font-bold text-red-500">{deletedUsers}</div>
        </motion.div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-white p-6 rounded-lg shadow-md h-[400px]"
        >
          <h3 className="text-xl font-bold mb-4">User Registration Trend</h3>
          <Line data={registrationData} options={chartOptions} />
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-white p-6 rounded-lg shadow-md h-[400px]"
        >
          <h3 className="text-xl font-bold mb-4">Active vs Inactive Users</h3>
          <Pie data={activeInactiveData} options={chartOptions} />
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-white p-6 rounded-lg shadow-md h-[400px]"
        >
          <h3 className="text-xl font-bold mb-4">Users by Region</h3>
          <Bar data={regionData} options={chartOptions} />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AnalyticsDashboard;