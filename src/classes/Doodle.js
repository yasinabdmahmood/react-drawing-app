import { v4 as uuidv4 } from 'uuid';

class Doodle {
  constructor(firstPoint, configurations) {
    this.points = [firstPoint];
    this.color = configurations.color;
    this.thickness = configurations.thickness;
  }

  draw() {
    const path = this.points.reduce((acc, point) => `${acc} L ${point.x} ${point.y}`, `M ${this.points[0].x} ${this.points[0].y}`);
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

  modify(newPoint) {
    this.points = [...this.points, newPoint];
  }
}

export default Doodle;
