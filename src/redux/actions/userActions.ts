import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface User {
  id: number;
  name: string;
  email: string;
  status?: 'active' | 'inactive';
}

export const fetchUsers = createAsyncThunk<User[], void>(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      
      return response.data.map((user: User) => ({
        ...user,
        status: Math.random() > 0.5 ? 'active' : 'inactive'
      }));
    } catch (error) {
      return rejectWithValue('Failed to fetch users');
    }
  }
);

export const deleteUser = createAsyncThunk<number, number>(
  'users/deleteUser',
  async (userId, { rejectWithValue }) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${userId}`);
      return userId;
    } catch (error) {
      return rejectWithValue('Failed to delete user');
    }
  }
);