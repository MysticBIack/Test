export default class Grid {
  constructor(start, end, w, h) {
    this.init(w, h);
    this.startNode = this.node[start.x][start.y];
    this.endNode = this.node[end.x][end.y];
    this.neighbours = [
      [1, 0],
      [0, 1],
      [-1, 0],
      [0, -1],
      [-1, 1],
      [1, 1],
      [-1, -1],
      [1, -1],
    ];
    this.width = w;
    this.height = h;
    this.startNode.gScore = 0;
  }

  init(width, height) {
    this.node = Array(height)
      .fill()
      .map(() => Array(width).fill(null));
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        this.node[i][j] = new Node(i, j);
      }
    }
  }

  astar(start, end) {
    let openSet = [];
    openSet.push(this.startNode);

    this.startNode.gScore = 0;
    this.startNode.fScore = manhattan(start, end);

    let cameFrom = new Map();

    while (openSet.length > 0) {
      let current = openSet.reduce((p, v) => {
        return p.fScore < v.fScore ? p : v;
      });

      if (current === this.endNode) {
        return this.reconstruct_path(cameFrom, current);
      }

      openSet.splice(openSet.indexOf(current), 1);

      for (let [x, y] of this.neighbours) {
        let i = current.x + x;
        let j = current.y + y;
        let tentative_gScore = current.gScore;
        if (i >= 0 && i < this.height && j >= 0 && j < this.width) {
          let neighbour = this.node[i][j];
          if (tentative_gScore < neighbour.gScore) {
            cameFrom.set(neighbour, current);
            neighbour.gScore = tentative_gScore;
            let coordsNeigh = { x: i, y: j };
            neighbour.fScore = neighbour.gScore + manhattan(coordsNeigh, end);
            if (openSet.indexOf(neighbour) == -1) openSet.push(neighbour);
          }
        }
      }
    }
    return "fail";
  }

  reconstruct_path(cameFrom, current) {
    let total_path = [[current.x, current.y]];
    while (cameFrom.has(current)) {
      current = cameFrom.get(current);
      //   total_path.push(current);
      total_path = [[current.x, current.y], ...total_path];
    }
    return total_path;
  }
}

class Node {
  constructor(x, y) {
    this.gScore = Number.MAX_SAFE_INTEGER;
    this.fScore = Number.MAX_SAFE_INTEGER;
    this.x = x;
    this.y = y;
  }
}

const manhattan = function (start, end) {
  return Math.abs(end.x - start.x) + Math.abs(end.y - start.y);
};
