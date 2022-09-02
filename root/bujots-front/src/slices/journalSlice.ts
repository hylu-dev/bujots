import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { emptyPage, IPage, IJot, emptyJot, IImage } from '../types';
import { RootState } from '../store';
import * as req from '../utils';
import pageReducer from './pageReducer';
import imageReducer from './imageReducer';

export interface JournalState {
    pages: IPage[],
    images: IImage[],
    imageFiles: any,
    selectedSticker: string, // id of sticker
    status: 'idle' | 'loading' | 'success' | 'fail', // for future api thunk rework
    current: number
}

const initialState: JournalState = {
    pages: [],
    images: [],
    imageFiles: {},
    selectedSticker: '',
    status: 'idle',
    current: -1
}

// export const retrievePages = createAsyncThunk('pages/getPages', async () => {})

export const journalSlice = createSlice({
    name: "journal",
    initialState,
    reducers: {
        ...pageReducer,
        ...imageReducer,
        setSticker: (state, action: PayloadAction<string>) => {
            state.selectedSticker = action.payload;
        },
    }
})

export const { addPage,
    removePage,
    addJot,
    switchPage,
    setTitle,
    setJots,
    setPage,
    setPages,
    setImages,
    addImage,
    removeImage,
    addImageFile
} = journalSlice.actions

export const getPages = (state: RootState) => state.journalReducer.pages;
export const getImages = (state: RootState) => state.journalReducer.images;
export const getImageFiles = (state: RootState) => state.journalReducer.imageFiles;
export const getSticker = (state: RootState) => state.journalReducer.selectedSticker;
export const getCurrentIndex = (state: RootState) => state.journalReducer.current;
export const getCurrentPage = (state: RootState) => state.journalReducer.current > -1 ? state.journalReducer.pages[state.journalReducer.current] : emptyPage;

export default journalSlice.reducer;
