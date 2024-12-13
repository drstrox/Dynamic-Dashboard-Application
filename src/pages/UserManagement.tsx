import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, deleteUser } from '../redux/actions/userActions';
import { RootState, AppDispatch } from '../redux/store';
import { motion } from 'framer-motion'; // Import Framer Motion
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const UserManagementDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, totalUsers, error } = useSelector((state: RootState) => state.users);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const handleDelete = (userId: number) => {
    dispatch(deleteUser(userId));
  };

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const goToAnalyticsDashboard = () => {
    navigate('/analytics');
  };

  return (
    <div className="p-8 bg-gradient-to-r from-indigo-800 to-purple-800 min-h-screen">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-6xl mx-auto space-y-6 transform transition-transform hover:scale-105 duration-300">

        {/* Title and Total Users Section */}
        <div className="flex justify-between items-center">
          <motion.h2
            className="text-4xl font-extrabold text-gray-900 tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            User Management
          </motion.h2>


          <motion.button
            onClick={goToAnalyticsDashboard}
            className="mt-8 px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg shadow-lg transform transition-all hover:scale-105 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 focus:outline-none duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-semibold text-lg">Analytics Dashboard</span>
          </motion.button>


          <motion.div
            className="text-xl text-gray-700 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Total Users: {totalUsers}
          </motion.div>
        </div>

        {/* Search Input */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-4 text-lg border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-all"
          />
        </motion.div>

        {/* Loading State */}
        {loading && !error ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500">Error loading users. Please try again later.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-indigo-100">
                  <th className="p-4 text-left text-sm font-semibold text-gray-700">Name</th>
                  <th className="p-4 text-left text-sm font-semibold text-gray-700">Email</th>
                  <th className="p-4 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="p-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedUsers.map(user => (
                  <motion.tr
                    key={user.id}
                    className="border-b hover:bg-indigo-50 transition duration-200"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <td className="p-4 text-gray-800">{user.name}</td>
                    <td className="p-4 text-gray-800">{user.email}</td>
                    <td className="p-4">
                      <span className={`px-4 py-2 rounded-full text-sm
                        ${user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <motion.button
                        onClick={() => handleDelete(user.id)}
                        className="bg-red-500 text-white px-6 py-2 rounded-lg shadow-md transform transition-all hover:bg-red-600 hover:scale-105 duration-200"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Delete
                      </motion.button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Section */}
        <div className="flex justify-between items-center mt-6">
          <motion.button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md disabled:opacity-50 transform transition-all hover:bg-indigo-700 hover:scale-105 duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Previous
          </motion.button>
          <span className="text-lg font-medium text-gray-700">Page {currentPage} of {totalPages}</span>
          <motion.button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md disabled:opacity-50 transform transition-all hover:bg-indigo-700 hover:scale-105 duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Next
          </motion.button>
        </div>

      </div>
    </div>
  );
};

export default UserManagementDashboard;
