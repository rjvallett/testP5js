let n; // Node list
let e; // Edge list
let g; // Graph object

function setup() {
  createCanvas(400, 400); // Create the canvas
  // Create an array of new nodes
  n = [new NodePoint(300, 300, "n0"),
         new NodePoint(300, 100, "n1"),
         new NodePoint(200, 100, "n2"),
         new NodePoint(100, 100, "n3"),
         new NodePoint(100, 200, "n4"),
         new NodePoint(100, 300, "n5")];

  // Create an array of new edges
  e = [new Edge(n[0], n[1], 0.1, "e1", "e0"),
         new Edge(n[0], n[2], 0.1, "e2", "e0"),
         new Edge(n[0], n[3], 0.1, "e3", "e0"),
         new Edge(n[0], n[4], 0.1, "e4", "e0"),
         new Edge(n[0], n[5], 0.1, "e5", "e0")];

  g = new Graph(e); // Create a new graph object
}

function draw() {
  background(220);
  g.render();
  text("Closest edge: " + g.getClosestEdge(mouseX, mouseY).getLabel(), 5, 15);

}

function mouseMoved() {
  //g.isOver(mouseX, mouseY);
}

function mousePressed() {
  //g.isPressed(mouseX, mouseY);
}

function mouseDragged() {
  //g.isDragged(mouseX, mouseY);
}

function mouseReleased() {

}

// Graph class
class Graph {
  constructor(e) {
    this.e = e; // "e" represents an array of edges
  }

  isOver(x, y) { // Check for all edges whether point (x, y) is over
    for (let i = 0; i < this.e.length; i++) {
      return this.e[i].isOver(x, y);
    }
  }

  isPressed(x, y) {
    for (let i = 0; i < e.length; i++) {
      e[i].isPressed(x, y);
    }
  }

  isDragged(x, y) {
    for (let i = 0; i < e.length; i++) {
      e[i].isPressed(x, y);
    }
  }

  // Return the closest edge to point (x, y)
  getClosestEdge(x, y) {
    let d = Array(this.e.length);
    for (let i = 0; i < this.e.length; i++) {
      this.e[i].projectPointOnEdge(x, y); // Store the length and distance in each object
      d[i] = this.e[i].getDistanceToEdge(); // Get the distance to the edge
    }

    // Get the index of the closest edge
    let m = 0;
    for (let j = 1; j < this.e.length; j++) {
      m = (d[j] < d[m]) ? j : m;
    }

    this.e[m].renderPointToEdge(x, y);
    this.e[m].renderLengthOnEdge();
    return this.e[m];
  }

  // Render the graph
  // Call this function in draw()
  render() {
    for (let i = 0; i < this.e.length; i++) {
      this.e[i].render();
    }
  }

}


// Edge class
class Edge {
  constructor(n1, n2, dz, label1, label2) {
    this.n1 = n1; // Node 1 object
    this.n2 = n2; // Node 2 object
    this.mx = this.n2.getPositionX() - this.n1.getPositionX(); // x-slope of edge
    this.my = this.n2.getPositionY() - this.n1.getPositionY(); // y-slope of edge
    this.dz = (dz < 0) ? 0 : (dz > 1) ? 1 : dz; // Dead-zone ratio (constrain between 0 and 1)
    //this.ndz = new NodePoint();
    this.label1 = label1;
    this.label2 = label2;
  }

  getLabel() {
    return this.label1;
  }

  radius(l) {

    this.n1.getPositionX();
    this.n1.getPositionY();

  }

  isOver(x, y) {
    if (this.n1.isOver(x, y)) {
      return this.n1; // Mouse over Node 1
    } else if (this.n2.isOver(x, y)) {
      return this.n2; // Mouse over Node 2
    } else if (this.ndz.isOver(x, y)) {
      return this.ndz;
    } else {
      return null;
    }
  }

  isPressed(x, y) {
    let n = this.isOver(x, y);
    if (n !== null) {
      n.setPosition(x, y);
    }
  }

  isDragged(x, y) {

  }

  // Project the point (x, y) to the edge
  projectPointOnEdge(x, y) {
    // Recalculate mx and my
    this.mx = this.n2.getPositionX() - this.n1.getPositionX();
    this.my = this.n2.getPositionY() - this.n1.getPositionY();

    //
    this.l = -(this.my * (this.n1.getPositionY() - y) + this.mx * (this.n1.getPositionX() - x)) / (pow(this.my, 2) + pow(this.mx, 2));

    this.pl = (this.l < 0) ? 0 : (this.l > 1) ? 1 : this.l; // Coerce the projected length between 0 and 1

    this.d = abs(this.mx * (this.n1.getPositionY() - y) - this.my * (this.n1.getPositionX() - x)) / (pow(this.my, 2) + pow(this.mx, 2));

    //return [l, d, this.n1.getPositionX() + mx * l, this.n1.getPositionY() + my * l];
  }


  getDistanceToEdge() {
    return this.d;
  }

  renderPointToEdge(x, y) {
    stroke(127); // 50% gray
    strokeWeight(1); // 1 pt
    line(this.n1.getPositionX() + this.mx * this.pl, this.n1.getPositionY() + this.my * this.pl, this.n1.getPositionX() + this.mx * this.l,  this.n1.getPositionY() + this.my * this.l);
    line(x, y, this.n1.getPositionX() + this.mx * this.l,  this.n1.getPositionY() + this.my * this.l);
    line(x, y, this.n1.getPositionX() + this.mx * this.pl,  this.n1.getPositionY() + this.my * this.pl);
  }

  renderLengthOnEdge() {
    stroke(255);
    strokeWeight(2);
    line(this.n1.getPositionX(), this.n1.getPositionY(), this.n1.getPositionX() + this.mx * this.pl, this.n1.getPositionY() + this.my * this.pl);
    strokeWeight(6);
    point(this.n1.getPositionX() + this.mx * this.pl, this.n1.getPositionY() + this.my * this.pl);
  }

  render() {
    stroke(0);
    strokeWeight(1);
    line(this.n1.getPositionX(), this.n1.getPositionY(), this.n2.getPositionX(), this.n2.getPositionY());
    this.n1.render();
    this.n2.render();
  }
}


class NodePoint {
  constructor(x, y, label) {
    this.x = x; // Node x-coordinate
    this.y = y; // Node y-coordinate
    this.label = label; // Node label
    this.sw = 2; // Node stroke weight
    this.ncolor = color(255, 255, 255);
    this.textcolor = color(0, 0, 0);
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  getPositionX() {
    return this.x;
  }

  getPositionY() {
    return this.y;
  }

  setIsMoving(val) {
    this.ismoving = val;
  }

  getIsMoving() {
    return this.ismoving;
  }

  isOver(x, y) {
    if (pow(this.x - x, 2) + pow(this.y - y, 2) <= 5) {
      this.sw = 10;
      return true;
    } else {
      this.sw = 2;
      return false;
    }
  }

  render() {
    fill(this.ncolor)
    strokeWeight(this.sw);
    point(this.x, this.y);
    fill(this.textcolor);
    text(this.label, this.x, this.y);
  }
}
