import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './stateReducer'

export const store = configureStore({
  reducer: {
    canvas: counterReducer,
  },
})