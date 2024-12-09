import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchUsers, deleteUser } from '../actions/userActions';

interface User {
  id: number;
  name: string;
  email: string;
  status: 'active' | 'inactive';
  region: string;
}

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
  totalUsers: number;
  activeUsers: number;
  deletedUsers: number;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
  totalUsers: 0,
  activeUsers: 0,
  deletedUsers: 0
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.totalUsers = action.payload.length;
        state.activeUsers = action.payload.filter(user => user.status === 'active').length;
        state.loading = false;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch users';
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(user => user.id !== action.payload);
        state.totalUsers -= 1;
        state.deletedUsers += 1;
      });
  }
});

export default userSlice.reducer;