import React, { useState } from 'react';
import Doodle from '../classes/Doodle';
import Box from './Box';

function DrawingApp() {
  const [lines, setLines] = useState([]);
  const [undoStack, setUndoStack] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);

  const handleMouseDown = (e) => {
    setIsDrawing(true);
    const startingPoint = { x: e.clientX, y: e.clientY };
    const doodle = new Doodle(startingPoint);
    setLines((prev) => [...prev, doodle]);
  };

  const handleMouseMove = (e) => {
    if (isDrawing) {
      const last = lines[lines.length - 1];
      last.modify({ x: e.clientX, y: e.clientY });
      setLines((prev) => prev.slice(0, -1).concat(last));
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    setUndoStack([]);
  };

  const handleUndo = () => {
    if (lines.length > 0) {
      setUndoStack(undoStack.concat([lines.slice(-1)[0]]));
      setLines(lines.slice(0, -1));
    }
  };

  const handleRedo = () => {
    if (undoStack.length > 0) {
      setLines(lines.concat([undoStack.slice(-1)[0]]));
      setUndoStack(undoStack.slice(0, -1));
    }
  };

  return (
    <div>
      <div style={{ position: 'absolute', left: '0%', top: '90%' }}>
        <button type="button" onClick={handleUndo}>Undo</button>
        <button type="button" onClick={handleRedo}>Redo</button>
      </div>
      <Box width={100} height={100} />

      <svg
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{
          position: 'absolute', left: '0%', top: '0%', width: '100vw', height: '90vh', border: '1px solid black', boxSizing: 'border-box',
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
