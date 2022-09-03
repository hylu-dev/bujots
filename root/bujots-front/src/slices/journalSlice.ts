import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { emptyPage, IPage, IJot, emptyJot, IImage, ISticker } from '../types';
import { RootState } from '../store';
import * as req from '../utils';
import pageReducer from './pageReducer';
import imageReducer from './imageReducer';
import stickerReducer from './stickerReducer';

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
        ...stickerReducer,
        resetState: (state) => {
            state.pages = initialState.pages;
            state.images = initialState.images;
            state.imageFiles = initialState.imageFiles;
            state.selectedSticker = initialState.selectedSticker;
            state.status = initialState.status;
            state.current = initialState.current;
        }
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
    addImageFile,
    setSticker,
    addSticker,
    deleteSticker,
    resetState
} = journalSlice.actions

export const getPages = (state: RootState) => state.journalReducer.pages;
export const getImages = (state: RootState) => state.journalReducer.images;
export const getImageFiles = (state: RootState) => state.journalReducer.imageFiles;
export const getSticker = (state: RootState) => state.journalReducer.selectedSticker;
export const getCurrentIndex = (state: RootState) => state.journalReducer.current;
export const getCurrentPage = (state: RootState) => state.journalReducer.current > -1 ? state.journalReducer.pages[state.journalReducer.current] : emptyPage;

export default journalSlice.reducer;
