import React, { useState } from 'react';

function DrawingApp() {
  const [lines, setLines] = useState([]);
  const [undoStack, setUndoStack] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);

  const handleMouseDown = e => {
    setIsDrawing(true);
    setLines(lines.concat([[{ x: e.clientX, y: e.clientY }]]));
  };

  const handleMouseMove = e => {
    if (isDrawing) {
      setLines(lines.slice(0, -1).concat([lines.slice(-1)[0].concat({ x: e.clientX, y: e.clientY })]));
    }
  };

  const handleMouseUp = () => {
    console.log(lines)
    setIsDrawing(false);
    setUndoStack([]);
  };

  const handleUndo = (event) => {
    
    if (lines.length > 0) {
      setUndoStack(undoStack.concat([lines.slice(-1)[0]]));
      setLines(lines.slice(0, -1));
    }
  };

  const handleRedo = (event) => {
    if (undoStack.length > 0) {
      setLines(lines.concat([undoStack.slice(-1)[0]]));
      setUndoStack(undoStack.slice(0, -1));
    }
  };

  return (
    <div>
        <div style={{position:'absolute',left:'0%',top:'90%'}}>
        <button onClick={handleUndo} >Undo</button>
        <button onClick={handleRedo} >Redo</button>
        </div>
      
      <svg
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{position:'absolute',left:'0%',top:'0%', width:'100vw', height:'90vh',border: '1px solid black',boxSizing: 'border-box'}}
      >
        {lines.map((line, index) => (
          <path
            key={index}
            d={line.reduce((acc, point) => acc + ` L ${point.x} ${point.y}`, `M ${line[0].x} ${line[0].y}`)}
            stroke="black"
            fill="none"
          />
        ))}
      </svg>
    </div>
  );
}

export default DrawingApp;
