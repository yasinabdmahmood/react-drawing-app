import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  shape: 'doodle',
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
    changeShape(state, action) {
      return { ...state, shape: action.payload };
    },
  },
});

export const { changeColor, changeThickness, changeShape } = configurationsSlice.actions;

export default configurationsSlice.reducer;
