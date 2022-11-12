import rough from 'roughjs/bundled/rough.esm';
import React, { useLayoutEffect, useState } from 'react';
import './App.css';

const generator = rough.generator();
function App() {
  const [elements, setElements] = useState([]);
  const [drawing, setDrawing] = useState(false);
  const [elementType, setElementType] = useState('line');
  useLayoutEffect(() => {
    const canvas = document.getElementById('canvas');
    const roughCanvas = rough.canvas(canvas);
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    elements.forEach(({ roughElement }) => {
      roughCanvas.draw(roughElement);
    });
  });
  const createElement = (x1, y1, x2, y2) => {
    const roughElement = elementType === 'line'
      ? generator.line(x1, y1, x2, y2)
      : generator.rectangle(x1, y1, x2 - x1, y2 - y1);
    return {
      x1, y1, x2, y2, roughElement,
    };
  };
  const handleMouseDown = (e) => {
    setDrawing(true);
    const { clientX, clientY } = e;
    const element = createElement(clientX, clientY, clientX, clientY);
    setElements((prev) => [...prev, element]);
  };
  const handleMouseMove = (e) => {
    if (!drawing) return;
    const index = elements.length - 1;
    const lastElement = elements[index];
    const { x1, y1 } = lastElement;
    const { clientX, clientY } = e;
    const updatedElement = createElement(x1, y1, clientX, clientY);
    const copyElements = [...elements];
    copyElements[index] = updatedElement;
    setElements(copyElements);
  };
  const handleMouseUp = () => {
    setDrawing(false);
  };
  return (
    <div>
      <div style={{ position: 'absolute', top: '10px', left: '10px' }}>

        <label htmlFor="line">
          Line
          <input
            type="radio"
            id="line"
            checked={elementType === 'line'}
            onChange={() => setElementType('line')}
          />
        </label>
        <label htmlFor="rectangle">
          rectangle
          <input
            type="radio"
            id="rectangle"
            checked={elementType === 'rectangle'}
            onChange={() => setElementType('rectangle')}
          />
        </label>
      </div>
      <canvas
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        id="canvas"
      />
    </div>
  );
}

export default App;
