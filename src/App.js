import rough from 'roughjs/bundled/rough.esm';
import React, { useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { addNewElement , updateElements, setIsDrawing, setElementType } from './redux/stateReducer'
import './App.css';

const generator = rough.generator();
function App() {
  const drawings = useSelector((state) => state.canvas.elements)
  const isDrawing = useSelector((state) => state.canvas.isDrawing)
  const elementType = useSelector((state) => state.canvas.elementType)
  const dispatch = useDispatch();
  //const [elementType, setElementType] = useState('line');
  useLayoutEffect(() => {
    const canvas = document.getElementById('canvas');
    const roughCanvas = rough.canvas(canvas);
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawings.forEach(({ roughElement }) => {
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
    dispatch(setIsDrawing(true))
    const { clientX, clientY } = e;
    const element = createElement(clientX, clientY, clientX, clientY);
    dispatch(addNewElement(element));
  };
  const handleMouseMove = (e) => {
    if (!isDrawing) return;
    const index = drawings.length - 1;
    const lastElement = drawings[index];
    const { x1, y1 } = lastElement;
    const { clientX, clientY } = e;
    const updatedElement = createElement(x1, y1, clientX, clientY);
    const copyElements = [...drawings];
    copyElements[index] = updatedElement;
    dispatch(updateElements(copyElements));
  };
  const handleMouseUp = () => {
    dispatch(setIsDrawing(false))
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
            onChange={() => dispatch(setElementType('line')) }
          />
        </label>
        <label htmlFor="rectangle">
          rectangle
          <input
            type="radio"
            id="rectangle"
            checked={elementType === 'rectangle'}
            onChange={() => dispatch(setElementType('rectangle'))}
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
