import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  color: 'black',
  thickness: 1,
};
const configurationsSlice = createSlice({
  name: 'configurations',
  initialState,
  reducers: {
    changeColor(state, action) {
      return { ...state, color: action.payload };
    },
    changeThickness(state, action) {
      return { ...state, thickness: action.payload };
    },
  },
});

export const { changeColor, changeThickness } = configurationsSlice.actions;

export default configurationsSlice.reducer;
