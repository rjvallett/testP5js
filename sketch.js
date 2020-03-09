let n;

function setup() {
  createCanvas(400, 400);
  n = new NodePoint(200, 100);
}

function draw() {
  background(220);
  n.render();
}

function mouseMoved() {
  n.isOver(mouseX, mouseY);
}

function mousePressed() {
  if (n.isOver(mouseX, mouseY) && !n.getIsMoving()) {
    console.log("here");
    n.setIsMoving(true);
  }
}

function mouseDragged() {

  if (n.getIsMoving) {
    console.log("moving");
    n.setPosition(mouseX, mouseY);
  }
}

function mouseReleased() {
  n.setIsMoving(false);
  console.log(n.getIsMoving());
}


class NodePoint {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  setIsMoving(val) {
    this.ismoving = val;
  }

  getIsMoving() {
    return this.ismoving;
  }

  isOver(x, y) {
    if (pow(this.x - x, 2) + pow(this.y - y, 2) <= 3) {
      strokeWeight(6);
      return true;
    } else {
      strokeWeight(2);
      return false;
    }
  }

  render() {
    point(this.x, this.y);
  }
}
