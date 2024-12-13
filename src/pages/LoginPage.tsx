import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../redux/actions/authActions';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await dispatch(loginUser({ email, password }) as any);
      if (result.payload) {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      <div className="flex bg-white rounded-xl shadow-2xl overflow-hidden w-full max-w-5xl">
        {/* Left Side with Modern UI Components */}
        <div className="hidden md:flex w-1/2 flex-col items-center justify-center bg-gradient-to-r from-purple-700 to-blue-700 text-white p-8">
          <h1 className="text-4xl font-bold mb-6">Welcome Back!</h1>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-purple-700 font-bold">1</div>
              <p className="text-lg">Stay connected with your account.</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-purple-700 font-bold">2</div>
              <p className="text-lg">Access personalized features and insights.</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-purple-700 font-bold">3</div>
              <p className="text-lg">Experience seamless navigation.</p>
            </div>
          </div>
        </div>
        {/* Right Side with Form */}
        <div className="w-full md:w-1/2 p-10">
          <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-6">Login to Your Account</h2>
          <p className="text-gray-600 text-center mb-8">Access your dashboard and manage your account seamlessly.</p>
          <form onSubmit={handleLogin}>
            <div className="mb-5">
              <label className="block text-gray-700 text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg hover:bg-gradient-to-r hover:from-blue-700 hover:to-purple-700 transition duration-200 font-bold shadow-lg"
            >
              Login
            </button>
          </form>
          
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
