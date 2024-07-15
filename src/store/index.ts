import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AuthReducer from './reducers/auth';

const reducers = combineReducers({
    auth : AuthReducer
});

const store = configureStore({reducer : reducers});

export type RootState = ReturnType<typeof store.getState>

export default store;