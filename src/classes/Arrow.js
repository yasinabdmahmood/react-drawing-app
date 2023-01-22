import { v4 as uuidv4 } from 'uuid';

class Arrow {
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
      <>
        <defs>
          <marker id="head" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="strokeWidth" orient="auto" markerWidth="12" markerHeight="9">
            <path d="M 0 0 L 10 5 L 0 10" stroke="black" strokeWidth={`${this.thickness}`} fill="none" />
          </marker>
        </defs>

        <path
          key={uuidv4()}
          className="arrow-line"
          markerEnd="url(#head)"
          strokeWidth={`${this.thickness}`}
          fill="none"
          stroke={this.color}
          d={path}
        />

      </>

    );
  }
}

export default Arrow;
