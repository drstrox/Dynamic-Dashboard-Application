import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';

import LoginPage from './pages/LoginPage';
import UserManagementDashboard from './pages/UserManagement';
import AnalyticsDashboard from './pages/AnalyticsDashboard';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<UserManagementDashboard />} />
          <Route path="/analytics" element={<AnalyticsDashboard />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;