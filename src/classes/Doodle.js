class Doodle {
  constructor(firstPoint) {
    this.points = [firstPoint];
  }

  draw() {
    const path = this.points.reduce((acc, point) => `${acc} L ${point.x} ${point.y}`, `M ${this.points[0].x} ${this.points[0].y}`);
    return path;
  }

  addPoint(newPoint) {
    this.points = [...this.points, newPoint];
  }
}

export default Doodle;
