import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    elements: [],
    isDrawing: false,
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    addNewElement: (state, action) => {
      state.elements.push(action.payload)
    },
    updateElements: (state,action) => {
        state.elements = action.payload
    },
    setIsDrawing: (state,action) => {
        state.isDrawing = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { addNewElement , updateElements, setIsDrawing } = counterSlice.actions

export default counterSlice.reducer