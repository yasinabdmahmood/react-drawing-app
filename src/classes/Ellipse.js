import { v4 as uuidv4 } from 'uuid';

class Ellipse {
  constructor(firstPoint, configurations) {
    this.firstPoints = firstPoint;
    this.lastPoint = firstPoint;
    this.color = configurations.color;
    this.thickness = configurations.thickness;
  }

  modify(lastPoint) {
    this.lastPoint = lastPoint;
  }

  static #getEllipseParam(corner1, corner2) {
    const cx = Math.floor((corner1.x + corner2.x) / 2);
    const cy = Math.floor((corner1.y + corner2.y) / 2);
    const rx = Math.abs((corner1.x - corner2.x) / 2);
    const ry = Math.abs((corner1.y - corner2.y) / 2);

    return {
      cx, cy, rx, ry,
    };
  }

  draw() {
    const {
      cx,
      cy,
      rx,
      ry,
    } = Ellipse.#getEllipseParam(this.firstPoints, this.lastPoint);
    return (
      <ellipse
        cx={cx}
        cy={cy}
        rx={rx}
        ry={ry}
        key={uuidv4()}
        stroke={this.color}
        fill="none"
        strokeWidth={`${this.thickness}`}
      />
    );
  }
}

export default Ellipse;
