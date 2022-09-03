import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface UserState {
    token: string,
    mousePos: [number, number]
}

const initialState: UserState = {
    token: '',
    mousePos: [0, 0]
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
        setMousePos: (state, action: PayloadAction<[number, number]>) => {
            state.mousePos = action.payload;
        },
    }
})

export const {
    setToken,
    setMousePos
} = userSlice.actions

export const getMousePos = (state: RootState) => state.userReducer.mousePos

export default userSlice.reducer;
