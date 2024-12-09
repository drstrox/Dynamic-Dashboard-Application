import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, deleteUser } from '../redux/actions/userActions';
import { RootState, AppDispatch } from '../redux/store';

const UserManagementDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, totalUsers } = useSelector((state: RootState) => state.users);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

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

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-md rounded-lg">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold">User Management</h2>
          <div>Total Users: {totalUsers}</div>
        </div>
        
        <div className="p-4">
          <input 
            type="text" 
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg mb-4"
          />

          {loading ? (
            <div>Loading...</div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedUsers.map(user => (
                  <tr key={user.id} className="border-b">
                    <td className="p-3">{user.name}</td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3">
                      <span className={`
                        px-2 py-1 rounded-full text-xs
                        ${user.status === 'active' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}
                      `}>
                        {user.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <button 
                        onClick={() => handleDelete(user.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <div className="flex justify-between mt-4">
            <button 
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span>Page {currentPage}</span>
            <button 
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={paginatedUsers.length < usersPerPage}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagementDashboard;