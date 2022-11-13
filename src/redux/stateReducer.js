import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    elements: [],
    isDrawing: false,
    elementType: 'line'
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
    },
    setElementType: (state,action) => {
        state.elementType = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { addNewElement , updateElements, setIsDrawing, setElementType } = counterSlice.actions

export default counterSlice.reducer