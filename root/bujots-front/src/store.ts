import { configureStore } from '@reduxjs/toolkit';
import journalReducer from './slices/journalSlice'
import userReducer from './slices/userSlice'

export const store = configureStore({
    reducer: { journalReducer, userReducer }
})

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch