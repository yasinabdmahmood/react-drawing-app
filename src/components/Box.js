import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CompactPicker } from 'react-color';
import { addDrawing, deleteLastDrawing } from '../redux/DrawingsReducer';
import { changeColor, changeThickness } from '../redux/configReducer';
import { addToUndoStack, removeFromUndoStack } from '../redux/undoStackReducer';
import undo from '../assets/images/arrow-counterclockwise.svg';
import redo from '../assets/images/arrow-clockwise.svg';
import style from '../assets/styles/Box.module.css';

const Box = () => {
  const [position, setPosition] = useState({ x: 10, y: 10 });
  const [isDragging, setIsDragging] = useState(false);
  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });
  const undoStack = useSelector((state) => state.undoStack);
  const lines = useSelector((state) => state.drawings);
  const [currentColor, thickness] = useSelector(
    (state) => [
      state.configurations.color,
      state.configurations.thickness,
    ],
  );
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
      dispatch(addToUndoStack(lines[lines.length - 1]));
      dispatch(deleteLastDrawing());
    }
  };

  const handleRedo = () => {
    if (undoStack.length > 0) {
      dispatch(addDrawing(undoStack.slice(-1)[0]));
      dispatch(removeFromUndoStack());
    }
  };

  const handleColorChnange = (color) => {
    dispatch(changeColor(color.hex));
  };

  return (
    <div
      className={style.container}
      style={{
        border: isDragging ? '2px solid blue' : '1px solid black',
        left: position.x,
        top: position.y,
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <button type="button" onClick={handleUndo} className={style['undo-redo-btn']}>
        <img src={undo} alt="undo" className={style['undo-redo-icon']} />
      </button>
      <button type="button" onClick={handleRedo} className={style['undo-redo-btn']}>
        <img src={redo} alt="undo" className={style['undo-redo-icon']} />
      </button>
      <CompactPicker
        color={currentColor}
        onChangeComplete={handleColorChnange}
      />
      <div
        className={style['horizontal-lines']}
      >
        <hr
          style={{
            height: '10px',
            border: thickness === 5 ? '1px solid yellow' : '0px',
          }}
          onClick={() => dispatch(changeThickness(5))}
        />
        <hr
          style={{
            height: '8px',
            border: thickness === 4 ? '1px solid yellow' : '0px',
          }}
          onClick={() => dispatch(changeThickness(4))}
        />
        <hr
          style={{
            height: '6px',
            border: thickness === 3 ? '1px solid yellow' : '0px',
          }}
          onClick={() => dispatch(changeThickness(3))}
        />
        <hr
          style={{
            height: '4px',
            border: thickness === 2 ? '1px solid yellow' : '0px',
          }}
          onClick={() => dispatch(changeThickness(2))}
        />
        <hr
          style={{
            height: '2px',
            border: thickness === 1 ? '1px solid yellow' : '0px',
          }}
          onClick={() => dispatch(changeThickness(1))}
        />
      </div>
    </div>
  );
};

export default Box;
