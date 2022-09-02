import { PayloadAction } from "@reduxjs/toolkit";
import { WritableDraft } from "immer/dist/internal";
import { emptyJot, IJot, IPage } from "../types";
import { JournalState } from "./journalSlice";


const pageReducer = {

    addPage: (state: WritableDraft<JournalState>, action: PayloadAction<IPage>) => {
        state.pages = [...state.pages, action.payload]
        state.current = state.pages.length - 1;
    },
    removePage: (state: WritableDraft<JournalState>) => {
        const newPages = [...state.pages]
        if (state.current > -1) newPages.splice(state.current, 1);
        state.pages = newPages;
        if (state.pages.length === 1) state.current = 0; // iff on page 0 and there's 1 page left
        else if (state.current === 0) state.pages.length > 1 ? state.current = state.current : state.current = -1; // iff on page 0 and there's > 1 page left
        else state.pages.length > 1 ? state.current -= 1 : state.current = -1; // iff not on page 0
    },
    addJot: (state: WritableDraft<JournalState>) => {
        const newPages = [...state.pages];
        newPages[state.current]['jots'].push(emptyJot)
        state.pages = newPages;
    },
    switchPage: (state: WritableDraft<JournalState>, action: PayloadAction<number>) => {
        state.current = action.payload;
    },
    setTitle: (state: WritableDraft<JournalState>, action: PayloadAction<string>) => {
        const newPages = [...state.pages];
        newPages[state.current].title = action.payload;
        state.pages = newPages;
    },
    setJots: (state: WritableDraft<JournalState>, action: PayloadAction<IJot[]>) => {
        const newPages = [...state.pages];
        newPages[state.current].jots = action.payload;
        console.log(newPages, action.payload);
        state.pages = newPages;
    },
    setPage: (state: WritableDraft<JournalState>, action: PayloadAction<IPage>) => {
        const newPages = [...state.pages];
        newPages[state.current]['jots'] = action.payload.jots;
        newPages[state.current]['title'] = action.payload.title;
        newPages[state.current]['stickers'] = action.payload.stickers;
        state.pages = newPages;
    },
    setPages: (state: WritableDraft<JournalState>, action: PayloadAction<IPage[]>) => {
        state.pages = action.payload;
        state.current = state.pages.length - 1;
    }
}

export default pageReducer;