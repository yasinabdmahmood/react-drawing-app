import { v4 as uuidv4 } from 'uuid';

class Diamond {
  constructor(firstPoint, configurations) {
    this.firstPoints = firstPoint;
    this.lastPoint = firstPoint;
    this.color = configurations.color;
    this.thickness = configurations.thickness;
  }

  modify(lastPoint) {
    this.lastPoint = lastPoint;
  }

  static #calulateDiamondCorners(corner1, corner2) {
    const avg = (num1,num2)=> Math.floor((num1+num2)/2);
    const p1 = {x: avg(corner1.x,corner2.x), y: corner1.y};
    const p2 = {x: corner2.x, y: avg(corner1.y,corner2.y)};
    const p3 = {x: avg(corner1.x,corner2.x), y: corner2.y};
    const p4 = {x: corner1.x, y: avg(corner1.y,corner2.y)};

    return {p1,p2,p3,p4};
  }

  draw() {
    const {
      p1,
      p2,
      p3,
      p4,
    } = Diamond.#calulateDiamondCorners(this.firstPoints, this.lastPoint);
    const points = `${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y} ${p4.x},${p4.y}`
    return (
      <polygon
        key={uuidv4()}
        stroke={this.color}
        fill="none"
        strokeWidth={`${this.thickness}`}
        points={points} 

       />
    );
  }
}

export default Diamond;
