import Doodle from '../classes/Doodle';
import Rectangle from '../classes/Rectangle';
import Line from '../classes/Line';
import Arrow from '../classes/Arrow';

const createDrawing = (startingPoint, configurations) => {
  let newDrawing = null;
  switch (configurations.shape) {
    case 'doodle':
      newDrawing = new Doodle(startingPoint, configurations);
      break;
    case 'rectangle':
      newDrawing = new Rectangle(startingPoint, configurations);
      break;
    case 'line':
      newDrawing = new Line(startingPoint, configurations);
      break;
    case 'arrow':
      newDrawing = new Arrow(startingPoint, configurations);
    break;
    default:
      newDrawing = new Doodle(startingPoint, configurations);
  }
  return newDrawing;
};

export default createDrawing;
