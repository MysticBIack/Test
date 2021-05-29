export default class Unit {
  constructor(x, y) {
    this.name = "Alex";
    this.id = "sasdadsd";
    this.image = "./soldier.png";
    this.coordinates = {
      x: x,
      y: y,
    };
  }

  appendUnitToMap(map) {
    let x = this.coordinates.x;
    let y = this.coordinates.y;
    map[x][y].div.style.backgroundImage = `url('${this.image}')`;
    map[x][y].div.unitInside = this;
  }

  movingAcross(map, destination) {}
}
