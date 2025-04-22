import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import persistStore from 'redux-persist/es/persistStore';
import { configureStore, combineReducers } from '@reduxjs/toolkit';

import { SLICES } from 'src/constants/redux';

import meReducer from './reducers/meSlice';
import authReducer from './reducers/authSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [SLICES.AUTH, SLICES.ME],
  blacklist: [],
};

const rootReducer = combineReducers({
  auth: authReducer,
  me: meReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type Dispatch = typeof store.dispatch;
