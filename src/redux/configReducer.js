import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  color: 'black',
};
const configurationsSlice = createSlice({
  name: 'configurations',
  initialState,
  reducers: {
    changeColor(state, action) {
      return { ...state, color: action.payload };
    },
  },
});

export const { changeColor } = configurationsSlice.actions;

export default configurationsSlice.reducer;
