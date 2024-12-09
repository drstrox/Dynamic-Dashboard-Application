import { createSlice } from '@reduxjs/toolkit';
import { fetchAnalytics } from '../actions/analyticsActions';

interface AnalyticsState {
  registrationTrend: { month: string; users: number }[];
  usersByRegion: { region: string; count: number }[];
  activeVsInactive: { active: number; inactive: number };
  loading: boolean;
  error: string | null;
}

const initialState: AnalyticsState = {
  registrationTrend: [],
  usersByRegion: [],
  activeVsInactive: { active: 0, inactive: 0 },
  loading: false,
  error: null
};

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnalytics.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAnalytics.fulfilled, (state, action) => {
        state.registrationTrend = action.payload.registrationTrend;
        state.usersByRegion = action.payload.usersByRegion;
        state.activeVsInactive = action.payload.activeVsInactive;
        state.loading = false;
      })
      .addCase(fetchAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch analytics';
      });
  }
});

export default analyticsSlice.reducer;