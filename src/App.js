import rough from 'roughjs/bundled/rough.esm';
import React, { useLayoutEffect, useState } from 'react';
import './App.css';


const generator = rough.generator();
function App() {
  const [elements, setElements] = useState([]);
  const [action, setAction] = useState('none');
  const [tool, setTool] = useState('line');
  const [selectedElement,setSelectedElement] = useState(null)
  useLayoutEffect(() => {
    const canvas = document.getElementById('canvas');
    const roughCanvas = rough.canvas(canvas);
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    elements.forEach(({ roughElement }) => {
      roughCanvas.draw(roughElement);
    });
  });
  const distance = (a,b) => {
   return Math.sqrt(Math.pow((a.x-b.x),2) + Math.pow((a.y-b.y),2))
  }
  const isWithinElement = (x, y, element) => {
    const {x1,y1,x2,y2,type} = element;
    if(type === 'rectangle'){
      const minX = Math.min(x1,x2);
      const maxX = Math.max(x1,x2);
      const minY = Math.min(y1,y2);
      const maxY = Math.max(y1,y2);
      return x >= minX && x <= maxX && y >= minY && y <= maxY;
    } else {
      const a = {x:x1,y:y1};
      const b = {x:x2,y:y2};
      const c = {x,y};
      const offset = distance(a,b) - (distance(a,c) + distance(b,c))
      return Math.abs(offset) < 1;
    }
  };
  const updateElement = (id,x1, y1, x2, y2, type) => {
    const updatedElement = createElement(id,x1, y1, x2, y2, type);
    const copyElements = [...elements];
    copyElements[id] = updatedElement;
    setElements(copyElements);
  }
  const getElementAtPosition = (x, y, elements) => elements.find(
    (element) => isWithinElement(x, y, element),
  );
  const createElement = (id, x1, y1, x2, y2, type) => {
    const roughElement = type === 'line'
      ? generator.line(x1, y1, x2, y2)
      : generator.rectangle(x1, y1, x2 - x1, y2 - y1);
    return {
      id,x1, y1, x2, y2, type, roughElement,
    };
  };
  const handleMouseDown = (e) => {
    const { clientX, clientY } = e;
    if (tool === 'selection') {
      const element = getElementAtPosition(clientX, clientY, elements);
      if(element){
        const offsetX = clientX - element.x1;
        const offsetY = clientY - element.y1;
        setSelectedElement({...element, offsetX, offsetY})
        setAction('moving')
      }
    } else {
      const id = elements.length;
      const element = createElement(id, clientX, clientY, clientX, clientY, tool);
      setElements((prev) => [...prev, element]);
      setAction('drawing');
    }
  };
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    if (action === 'drawing') {
      const index = elements.length - 1;
      const lastElement = elements[index];
      const { x1, y1 } = lastElement;
      updateElement(index,x1, y1, clientX, clientY, tool);
      
    } else if(action === 'moving') {
      const {id,x1,x2,y1,y2,type,offsetX,offsetY} = selectedElement;
      const width = x2 - x1;
      const height = y2 - y1;
      const newX1 = clientX - offsetX;
      const newY1 = clientY - offsetY
      updateElement(id,newX1, newY1, newX1 + width, newY1 + height, type);

    }
  };
  const handleMouseUp = () => {
    setAction('none');
    setSelectedElement(null)
  };
  return (
    <div>
      <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
        <label htmlFor="selection">
          selection
          <input
            type="radio"
            id="selection"
            checked={tool === 'selection'}
            onChange={() => setTool('selection')}
          />
        </label>
        <label htmlFor="line">
          Line
          <input
            type="radio"
            id="line"
            checked={tool === 'line'}
            onChange={() => setTool('line')}
          />
        </label>
        <label htmlFor="rectangle">
          rectangle
          <input
            type="radio"
            id="rectangle"
            checked={tool === 'rectangle'}
            onChange={() => setTool('rectangle')}
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
