import Perlin from "./Perlin.js";
import Square from "./Square.js";
import Unit from "./Unit.js";

const unitNameP = document.getElementById("unitName");
const unitIDP = document.getElementById("unitID");
const infoBoard = document.getElementById("InfoBoard");

const infoBoardDim = {
  height: infoBoard.offsetHeight,
  width: infoBoard.offsetWidth,
};
infoBoard.style.display = "none";

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
    map[i][j].div.addEventListener("click", () => {
      checkOutline(map[i][j]);
    });
  }
}

document.addEventListener("click", (e) => {
  if (e.target.tagName === "DIV") {
    let theClickedDiv = e.target;
    if (!theClickedDiv.unitInside || theClickedDiv.unitInside.length === 0) {
      theClickedDiv.unitInside = [];
      removeUnitInfoPopUp();
    } else if (theClickedDiv.unitInside) {
      if (theClickedDiv.classList.contains("stack-top")) {
        //if you want to deselect the unit that was already selected
        unitInfoPopUp(e.clientX, e.clientY, theClickedDiv.unitInside);
      } else removeUnitInfoPopUp();
    }
  } else {
    removeUnitInfoPopUp();
    prev.div.classList.remove("stack-top");
  }
});

let firstUnit = new Unit(2, 2, "Alex", map);
let secondUnit = new Unit(5, 2, "Bob", map);
let thirdUnit = new Unit(2, 4, "Ubi", map);
let testUnit = new Unit(46, 0, "PopUpTest", map); //delete
let testUnit1 = new Unit(0, 69, "PopUpTest", map); //delete
let testUnit2 = new Unit(49, 69, "PopUpTest", map); //delete
let testUnit3 = new Unit(0, 0, "PopUpTest", map); //delete

function removeUnitInfoPopUp() {
  infoBoard.style.display = "none";
}

function unitInfoPopUp(mouseX, mouseY, theUnit) {
  unitNameP.innerHTML = "Name: " + theUnit.name;
  unitIDP.innerHTML = "ID: " + theUnit.id;
  checkIfInWindow(mouseX, mouseY);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      infoBoard.style.display = "none";
    }
  });
}

function checkIfInWindow(mouseX, mouseY) {
  if (mouseX + infoBoardDim.width > window.innerWidth - 20) {
    infoBoard.style.left = `${mouseX - 10 - infoBoardDim.width}px`;
  } else {
    infoBoard.style.left = `${mouseX + 10}px`;
  }
  if (mouseY + infoBoardDim.height > window.innerHeight - 20) {
    infoBoard.style.top = `${mouseY - 10 - infoBoardDim.height}px`;
  } else {
    infoBoard.style.top = `${mouseY + 10}px`;
  }
  infoBoard.style.display = "block";
}
