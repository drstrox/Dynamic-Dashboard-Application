import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAnalytics = createAsyncThunk(
  'analytics/fetchAnalytics',
  async () => {
    // Mock analytics data generation
    const registrationTrend = [
      { month: 'Jan', users: 120 },
      { month: 'Feb', users: 150 },
      { month: 'Mar', users: 200 },
      { month: 'Apr', users: 180 },
      { month: 'May', users: 220 },
      { month: 'Jun', users: 250 }
    ];

    const usersByRegion = [
      { region: 'North', count: 150 },
      { region: 'South', count: 120 },
      { region: 'East', count: 100 },
      { region: 'West', count: 180 }
    ];

    const activeVsInactive = { 
      active: 350, 
      inactive: 200 
    };

    return { registrationTrend, usersByRegion, activeVsInactive };
  }
);