import { configureStore } from '@reduxjs/toolkit';
import journalReducer from './slices/journalSlice'

export const store = configureStore({
    reducer: { journalReducer }
})

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch