import Grid from "./Astar.js";
export default class Unit {
  constructor(x, y, name, map) {
    this.name = name;
    this.id = this.generateRandomID();
    this.image = "./soldier.png";
    this.coordinates = {
      x: x,
      y: y,
    };
    this.map = map;
    this.appendUnitToMap();
  }

  generateRandomID() {
    return Math.random().toString(36).substr(2, 9);
  }

  appendUnitToMap() {
    let x = this.coordinates.x;
    let y = this.coordinates.y;
    this.map[x][y].div.style.backgroundImage = `url('${this.image}')`;
    this.map[x][y].div.unitInside = this;
  }

  async movingAcross(coords) {
    let endCoords = {
      x: coords[0],
      y: coords[1],
    };
    let width = this.map[0].length;
    let height = this.map.length;
    const grid = new Grid(this.coordinates, endCoords, width, height);
    const directions = grid.astar(this.coordinates, endCoords);
    for (let [x, y] of directions) {
      this.update(x, y);
      await sleep(100);
    }
  }

  update(targetX, targetY) {
    this.map[targetX][targetY].div.style.backgroundImage = `url('${this.image}')`;
    this.map[targetX][targetY].div.unitInside = this;
    this.map[this.coordinates.x][this.coordinates.y].div.style.backgroundImage = "none";
    this.map[this.coordinates.x][this.coordinates.y].div.unitInside = [];
    this.coordinates.x = targetX;
    this.coordinates.y = targetY;
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
