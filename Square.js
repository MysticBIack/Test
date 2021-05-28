export default class Square {
  constructor(x, y, t) {
    this.x = x;
    this.y = y;
    this.topography = t;
    (this.div = this.divCreation()), this.blockColor();
    // this.blockColor();
    [];
  }

  divCreation() {
    let div = document.createElement(`div`);
    div.setAttribute("id", `${this.x},${this.y}`);
    // div.style.backgroundColor = this.blockColor();
    div.addEventListener("click", () => {
      if (div.classList.contains("stack-top")) {
        div.classList.remove("stack-top");
      } else div.classList.add("stack-top");
    });
    return div;
  }

  blockColor() {
    if (this.topography <= 0.2) {
      this.div.classList.add("greenish");
    } else if (this.topography <= 0.26) {
      this.div.classList.add("deep-sea");
    } else if (this.topography <= 0.3) {
      this.div.classList.add("sea");
    } else if (this.topography <= 0.37) {
      this.div.classList.add("sand");
    } else if (this.topography <= 0.425) {
      this.div.classList.add("hard-sand");
    } else if (this.topography <= 0.595) {
      this.div.classList.add("terracota");
    } else if (this.topography <= 0.652) {
      this.div.classList.add("dirt1");
    } else if (this.topography <= 0.72) {
      this.div.classList.add("dirt2");
    } else if (this.topography <= 0.79) {
      this.div.classList.add("dirt3");
    } else if (this.topography <= 0.821) {
      this.div.classList.add("rock");
    } else {
      this.div.classList.add("rock-solid");
    }
  }
}
