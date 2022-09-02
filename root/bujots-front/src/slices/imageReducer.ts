import { PayloadAction } from "@reduxjs/toolkit";
import { WritableDraft } from "immer/dist/internal";
import { IImage } from "../types";
import { JournalState } from "./journalSlice";


const imageReducer = {

    setImages: (state: WritableDraft<JournalState>, action: PayloadAction<IImage[]>) => {
        state.images = action.payload;
    },
    addImage: (state: WritableDraft<JournalState>, action: PayloadAction<IImage>) => {
        state.images = [action.payload, ...state.images];
    },
    removeImage: (state: WritableDraft<JournalState>, action: PayloadAction<number>)  => {
        const newImages = [...state.images]
        newImages.splice(action.payload, 1);
        state.images = newImages;
    },
    addImageFile: (state: WritableDraft<JournalState>, action: PayloadAction<IImage>) => {
        const newImageFiles = {...state.imageFiles}
        newImageFiles[action.payload._id] = action.payload.source;
        state.imageFiles = newImageFiles;
    },
}

export default imageReducer;