import { createSlice } from '@reduxjs/toolkit';

const initialState = [];
const drawingsSlice = createSlice({
  name: 'drawings',
  initialState,
  reducers: {
    addDrawing(state, action) {
      return [...state, action.payload];
    },
    modifyLastDrawing(state, action) {
      return state.slice(0, -1).concat(action.payload);
    },
    deleteLastDrawing(state) {
      return state.slice(0, -1);
    },
  },
});

export const { addDrawing, modifyLastDrawing, deleteLastDrawing } = drawingsSlice.actions;

export default drawingsSlice.reducer;
