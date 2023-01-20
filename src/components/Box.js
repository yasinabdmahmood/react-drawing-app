import React, { useState } from 'react';

const Box = ({ width, height }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    setInitialPosition({ x: e.clientX, y: e.clientY });
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
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

  return (
    <div
      style={{
        width,
        height,
        backgroundColor: 'gray',
        border: isDragging? '2px solid blue' : '1px solid black',
        position: 'relative',
        left: position.x,
        top: position.y,
        zIndex: '2',
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    />
  );
};

export default Box;
