import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface LoginCredentials {
  email: string;
  password: string;
}

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }: LoginCredentials, { rejectWithValue }) => {
    try {
      // Mock login - replace with actual API endpoint in production
      if (email === 'user@example.com' && password === 'password123') {
        return {
          id: 1,
          email: email,
          name: 'John Doe',
          token: 'mock_token_12345'
        };
      } else {
        return rejectWithValue('Invalid credentials');
      }
    } catch (error) {
      return rejectWithValue('Login failed');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async () => {
    // Perform logout logic (clear token, etc.)
    return null;
  }
);