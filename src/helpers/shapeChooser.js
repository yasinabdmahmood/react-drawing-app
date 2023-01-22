import Doodle from '../classes/Doodle';
import Rectangle from '../classes/Rectangle';
import Line from '../classes/Line';
import Arrow from '../classes/Arrow';
import Ellipse from '../classes/Ellipse';
import Diamond from '../classes/Diamond';

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
    case 'ellipse':
      newDrawing = new Ellipse(startingPoint, configurations);
      break;
    case 'diamond':
      newDrawing = new Diamond(startingPoint, configurations);
      break;
    default:
      newDrawing = new Doodle(startingPoint, configurations);
  }
  return newDrawing;
};

export default createDrawing;
