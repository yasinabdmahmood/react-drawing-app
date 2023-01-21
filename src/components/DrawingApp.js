import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addDrawing, modifyLastDrawing } from '../redux/DrawingsReducer';
import { clearUndoStack } from '../redux/undoStackReducer';
import createDrawing from '../helpers/shapeChooser';
import Box from './Box';
import pencil from '../assets/images/pencil.svg';

function DrawingApp() {
  const lines = useSelector((state) => state.drawings);
  const [color, thickness, shape] = useSelector(
    (state) => [
      state.configurations.color,
      state.configurations.thickness,
      state.configurations.shape,
    ],
  );
  const dispatch = useDispatch();
  const [isDrawing, setIsDrawing] = useState(false);

  const handleMouseDown = (e) => {
    setIsDrawing(true);
    const startingPoint = { x: e.clientX, y: e.clientY };
    // const doodle = new Doodle(startingPoint, color, thickness);
    // const rectangle = new Rectangle(startingPoint, color, thickness);
    const drawing = createDrawing(shape, startingPoint, color, thickness);
    dispatch(addDrawing(drawing));
  };

  const handleMouseMove = (e) => {
    if (isDrawing) {
      const last = lines[lines.length - 1];
      last.modify({ x: e.clientX, y: e.clientY });
      dispatch(modifyLastDrawing(last));
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    dispatch(clearUndoStack());
  };

  return (
    <div
      style={{
        cursor: `url(${pencil}) 4 12, auto`,
      }}
    >
      <Box />
      <svg
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{
          position: 'absolute', left: '0%', top: '0%', width: '100vw', height: '100vh', border: '1px solid black', boxSizing: 'border-box',
        }}
      >
        {lines.map((line) => (
          line.draw()
        ))}
      </svg>
    </div>
  );
}

export default DrawingApp;
