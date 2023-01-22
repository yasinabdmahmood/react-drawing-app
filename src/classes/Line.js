import { v4 as uuidv4 } from 'uuid';

class Line {
  constructor(firstPoint, configurations) {
    this.firstPoint = firstPoint;
    this.lastPoint = firstPoint;
    this.color = configurations.color;
    this.thickness = configurations.thickness;
  }

  modify(newPoint) {
    this.lastPoint = newPoint;
  }

  draw() {
    const [x1, y1] = [this.firstPoint.x, this.firstPoint.y];
    const [x2, y2] = [this.lastPoint.x, this.lastPoint.y];
    const path = `M ${x1} ${y1} L ${x2} ${y2}`;
    return (
      <path
        key={uuidv4()}
        d={path}
        stroke={this.color}
        fill="none"
        strokeWidth={`${this.thickness}`}
      />
    );
  }
}

export default Line;
