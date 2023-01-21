import Doodle from '../classes/Doodle';
import Rectangle from '../classes/Rectangle';

const createDrawing = (shape, startingPoint, color, thickness) => {
  let newDrawing = null;
  switch (shape) {
    case 'doodle':
      newDrawing = new Doodle(startingPoint, color, thickness);
      break;
    case 'rectangle':
      newDrawing = new Rectangle(startingPoint, color, thickness);
      break;
    default:
      newDrawing = new Doodle(startingPoint, color, thickness);
  }
  return newDrawing;
};

export default createDrawing;
