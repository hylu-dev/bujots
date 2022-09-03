import { PayloadAction } from "@reduxjs/toolkit";
import { WritableDraft } from "immer/dist/internal";
import { ISticker } from "../types";
import { JournalState } from "./journalSlice";


const stickerReducer = {
    setSticker: (state: WritableDraft<JournalState>, action: PayloadAction<string>) => {
        state.selectedSticker = action.payload;
    },
    addSticker: (state: WritableDraft<JournalState>, action: PayloadAction<ISticker>) => {
        const newPages = [...state.pages];
        newPages[state.current].stickers.push(action.payload);
        state.pages = newPages;
        state.selectedSticker = ''
    },
    deleteSticker: (state: WritableDraft<JournalState>, action: PayloadAction<string>) => {
        const newPages = [...state.pages];
        const newStickers = newPages[state.current].stickers.filter(item => {
            return item.image_id !== action.payload;
        })
        newPages[state.current].stickers = newStickers;
        state.pages = newPages;
        state.selectedSticker = ''
    },
    deleteSingleSticker: (state: WritableDraft<JournalState>, action: PayloadAction<number>) => {
        console.log(action.payload);
        const newPages = [...state.pages];
        newPages[state.current].stickers.splice(action.payload, 1);
        state.pages = newPages;
    },
}

export default stickerReducer;