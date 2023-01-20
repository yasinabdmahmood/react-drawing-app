import { createSlice } from '@reduxjs/toolkit';

const initialState = [];
const undoStackSlice = createSlice({
  name: 'undoStack',
  initialState,
  reducers: {
    addToUndoStack(state, action) {
      return [...state, action.payload];
    },
    removeFromUndoStack(state) {
      if (state.length > 0) {
        return state.slice(0, -1);
      }
      return state;
    },
    clearUndoStack() {
      return [];
    },
  },
});

export const { addToUndoStack, removeFromUndoStack, clearUndoStack } = undoStackSlice.actions;

export default undoStackSlice.reducer;
