import { combineReducers, configureStore } from '@reduxjs/toolkit'
import persistReducer from 'redux-persist/es/persistReducer';
import userReducer from '../redux/slices/userSlice';
import searchReducer from '../redux/slices/searchSlice';
import cartReducer from '../redux/slices/cartSlice';
import drawerReducer from '../redux/slices/drawerSlice';
import storage from 'redux-persist/lib/storage'

import {
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'

// persist
const persistConfig = {
    key: 'root',
    version: 1,
    storage
}

const reducers = combineReducers({ user: userReducer, search: searchReducer, cart: cartReducer, drawer: drawerReducer });

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                ignoredActionPaths: ['payload.token'],
                ignoredPaths: ['user.loggedInUser.token'],
            },
        }),
})






