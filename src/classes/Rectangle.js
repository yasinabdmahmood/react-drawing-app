import { v4 as uuidv4 } from 'uuid';

class Rectangle {
  constructor(firstPoint, color = 'black', thickness = 1) {
    this.firstPoints = firstPoint;
    this.lastPoint = firstPoint;
    this.color = color;
    this.thickness = thickness;
  }

  modify(lastPoint) {
    this.lastPoint = lastPoint;
  }

  static #rectangleCorners(corner1, corner2) {
    const xMin = Math.min(corner1.x, corner2.x);
    const yMin = Math.min(corner1.y, corner2.y);
    const xMax = Math.max(corner1.x, corner2.x);
    const yMax = Math.max(corner1.y, corner2.y);

    return {
      upperLeft: { x: xMin, y: yMin },
      width: xMax - xMin,
      height: yMax - yMin,
    };
  }

  draw() {
    const {
      upperLeft,
      width,
      height,
    } = Rectangle.#rectangleCorners(this.firstPoints, this.lastPoint);
    return (
      <rect
        key={uuidv4()}
        stroke={this.color}
        fill="none"
        strokeWidth={`${this.thickness}`}
        x={upperLeft.x}
        y={upperLeft.y}
        width={width}
        height={height}
      />
    );
  }
}

export default Rectangle;
