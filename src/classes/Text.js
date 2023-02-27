import { v4 as uuidv4 } from 'uuid';

class Text {
  constructor(textCoordinate, configurations) {
    this.textCoordinate = textCoordinate;
    this.content = '';
    this.color = configurations.color;
    this.thickness = configurations.thickness;
  }

  modify(newLetter) {
    this.content += newLetter;
  }

  draw() {
    return (
      <text
        key={uuidv4()}
        x={this.textCoordinate.x}
        y={this.textCoordinate.y}
      >
        { this.content}
      </text>
    //   <path
    //     key={uuidv4()}
    //     d={path}
    //     stroke={this.color}
    //     fill="none"
    //     strokeWidth={`${this.thickness}`}
    //   />
    );
  }
}

export default Text;
