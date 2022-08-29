import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { emptyPage, IPage, IJot, emptyJot } from '../types';
import { RootState } from '../store';
import * as req from '../utils';

interface JournalState {
    pages: IPage[],
    status: 'idle' | 'loading' | 'success' | 'fail',
    current: number 
}

const initialState: JournalState = {
    pages: [],
    status: 'idle',
    current: -1
}

// export const retrievePages = createAsyncThunk('pages/getPages', async () => {})

export const journalSlice = createSlice({
    name: "journal",
    initialState,
    reducers: {
        addPage: (state, action: PayloadAction<IPage>) => {
            state.pages = [...state.pages, action.payload]
            state.current = state.pages.length-1;
        },
        removePage: (state) => {
            const newPages = [...state.pages]
            if (state.current > -1) newPages.splice(state.current, 1);
            state.pages = newPages;
            if (state.pages.length === 1) state.current = 0; // iff on page 0 and there's 1 page left
            else if (state.current === 0) state.pages.length > 1 ? state.current = state.current : state.current = -1; // iff on page 0 and there's > 1 page left
            else state.pages.length > 1 ? state.current -= 1 : state.current = -1; // iff not on page 0
            console.log(state.current);
        },
        addJot: (state) => {
            const newPages = [...state.pages];
            newPages[state.current]['jots'].push(emptyJot)
            state.pages = newPages;
        },
        switchPage: (state, action: PayloadAction<number>) => {
            state.current = action.payload;
        },
        setTitle: (state, action: PayloadAction<string>) => {
            const newPages = [...state.pages];
            newPages[state.current].title = action.payload;
            state.pages = newPages;
        },
        setJots: (state, action: PayloadAction<IJot[]>) => {
            const newPages = [...state.pages];
            newPages[state.current].jots = action.payload;
            console.log(newPages, action.payload);
            state.pages = newPages;
        },
        setPage: (state, action: PayloadAction<IPage>) => { 
            const newPages = [...state.pages];
            newPages[state.current]['jots'] = action.payload.jots;
            newPages[state.current]['title'] = action.payload.title;
            state.pages = newPages;
        },
        setPages: (state, action: PayloadAction<IPage[]>) => {
            state.pages = action.payload;
            state.current = state.pages.length-1;
        }

    }
})

export const { addPage, removePage, addJot, switchPage, setTitle, setJots, setPage, setPages } = journalSlice.actions
export const getPages = (state: RootState) => state.journalReducer.pages;
export const getCurrentIndex = (state: RootState) => state.journalReducer.current;
export const getCurrentPage = (state: RootState) => state.journalReducer.current > -1 ? state.journalReducer.pages[state.journalReducer.current] : emptyPage;

export default journalSlice.reducer;
