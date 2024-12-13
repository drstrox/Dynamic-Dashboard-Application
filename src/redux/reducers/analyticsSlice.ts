import { createSlice } from '@reduxjs/toolkit';
import { fetchAnalytics } from '../actions/analyticsActions';

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
        state.error = null;
      })
      .addCase(fetchAnalytics.fulfilled, (state, action) => {
        state.registrationTrend = action.payload.registrationTrend;
        state.usersByRegion = action.payload.usersByRegion;
        state.activeVsInactive = action.payload.activeVsInactive;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch analytics';
      });
  }
});

export default analyticsSlice.reducer;