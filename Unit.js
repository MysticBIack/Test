export default class Unit {
  constructor(x, y, name, map) {
    this.name = name;
    this.id = this.generateRandomID();
    this.image = "./soldier.png";
    this.coordinates = {
      x: x,
      y: y,
    };
    this.appendUnitToMap(map);
  }

  generateRandomID() {
    return Math.random().toString(36).substr(2, 9);
  }

  appendUnitToMap(map) {
    let x = this.coordinates.x;
    let y = this.coordinates.y;
    map[x][y].div.style.backgroundImage = `url('${this.image}')`;
    map[x][y].div.unitInside = this;
  }

  movingAcross(map, destination) {}
}
