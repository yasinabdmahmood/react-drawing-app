import { configureStore } from '@reduxjs/toolkit';
import drawingsSlice from './DrawingsReducer';
import undoStackReducer from './undoStackReducer';
import configReducer from './configReducer';

const store = configureStore({
  reducer: {
    drawings: drawingsSlice,
    undoStack: undoStackReducer,
    configurations: configReducer,
  },
});

export default store;
