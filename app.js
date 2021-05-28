import Perlin from "./Perlin.js";
import Square from "./Square.js";
import Unit from "./Unit.js";

const unitNameP = document.getElementById("unitName");
const unitIDP = document.getElementById("unitID");
var pn = new Perlin("ve");

let prev = null;
const checkOutline = (current) => {
  if (prev && prev != current) {
    prev.div.classList.remove("stack-top");
  }
  prev = current;
};

const map = Array(50)
  .fill(null)
  .map(() => Array(70).fill(null));

for (let i = 0; i < map.length; i++) {
  for (let j = 0; j < map[i].length; j++) {
    map[i][j] = new Square(
      i,
      j,
      pn.noise((i * 5) / map.length - 0.4, (j * 5) / map[i].length - 0.4, 0)
    );
    let containter = document.getElementById("container");
    map[i][j].div.addEventListener("click", (e) => {
      checkOutline(map[i][j]);
    });
    containter.appendChild(map[i][j].div);
  }
}

document.addEventListener("click", (e) => {
  if (e.target.tagName === "DIV") {
    let theClickedDiv = e.target;
    if (!theClickedDiv.unitInside || theClickedDiv.unitInside.length === 0) {
      theClickedDiv.unitInside = [];
      unitNameP.innerHTML = "No unit selected";
      console.log(theClickedDiv.unitInside);
    } else if (theClickedDiv.unitInside) {
      let unitInfo = theClickedDiv.unitInside;
      unitNameP.innerHTML = "Name: " + unitInfo.name;
      unitIDP.innerHTML = "ID: " + unitInfo.id;
      console.log(theClickedDiv.unitInside);
    }
  }
});

let firstUnit = new Unit(2, 2);
firstUnit.appendUnitToMap(map);
