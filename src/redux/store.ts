import { configureStore } from '@reduxjs/toolkit';
import { 
  useDispatch as useReduxDispatch, 
  useSelector as useReduxSelector 
} from 'react-redux';
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

// Custom typed hooks for better type inference
export const useDispatch = () => useReduxDispatch<AppDispatch>();
export const useSelector = <TSelected>(
  selector: (state: RootState) => TSelected
) => useReduxSelector<RootState, TSelected>(selector);