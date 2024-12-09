import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userSlice';
import authReducer from './reducers/authSlice';
import analyticsReducer from './reducers/analyticsSlice';

export const store = configureStore({
  reducer: {
    users: userReducer,
    auth: authReducer,
    analytics: analyticsReducer
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;