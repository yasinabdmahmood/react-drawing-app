import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CompactPicker } from 'react-color';
import { addDrawing, deleteLastDrawing } from '../redux/DrawingsReducer';
import { changeColor } from '../redux/configReducer';
import { addToUndoStack, removeFromUndoStack } from '../redux/undoStackReducer';

const Box = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });
  const undoStack = useSelector((state) => state.undoStack);
  const lines = useSelector((state) => state.drawings);
  const currentColor = useSelector((state) => state.configurations.color);
  const dispatch = useDispatch();

  const handleMouseDown = (e) => {
    if (e.target !== e.currentTarget) return;
    setInitialPosition({ x: e.clientX, y: e.clientY });
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (e.target !== e.currentTarget) return;
    if (!isDragging) {
      return;
    }
    setPosition({
      x: position.x + e.clientX - initialPosition.x,
      y: position.y + e.clientY - initialPosition.y,
    });
    setInitialPosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleUndo = () => {
    if (lines.length > 0) {
      // setUndoStack(undoStack.concat([lines.slice(-1)[0]]));
      // setLines(lines.slice(0, -1));
      dispatch(addToUndoStack(lines[lines.length - 1]));
      dispatch(deleteLastDrawing());
    }
  };

  const handleRedo = () => {
    if (undoStack.length > 0) {
      dispatch(addDrawing(undoStack.slice(-1)[0]));
      // setUndoStack(undoStack.slice(0, -1));
      dispatch(removeFromUndoStack());
    }
  };

  const handleColorChnange = (color) => {
    dispatch(changeColor(color.hex));
  };

  return (
    <div
      style={{
        width: '245px',
        height: '250px',
        backgroundColor: 'gray',
        border: isDragging ? '2px solid blue' : '1px solid black',
        position: 'absolute',
        left: position.x,
        top: position.y,
        zIndex: '1',
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <button type="button" onClick={handleUndo}>Undo</button>
      <button type="button" onClick={handleRedo}>Redo</button>
      <CompactPicker
        color={currentColor}
        onChangeComplete={handleColorChnange}
      />
    </div>
  );
};

export default Box;
