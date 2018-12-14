/**
 * @author       Anna Rodziewicz
 * @description  inspired by J. Pollock
 */


class PollocksCanvas {
  constructor(id) {
    this.id = id;
    this.colors = ['#896978', '#3E1929', '#2F4858', '#191D32', '#D7DEDC'];
    this.size = '';
  }

  init() {
    this.canvas = this.getCanvas();
    this.canvas && this.makeMagic();
  }

  getCanvas() {
    return document.getElementById(this.id) || console.log('Ops, where is your canvas? 🔍');
  }

  makeMagic() {
    this.resizeCanvas();
    this.createContext();
    this.fillBackground();
    this.colors.forEach(color => {
      this.paint(color);
    });
  }

  resizeCanvas() {
    this.size = this.size || Math.min(window.innerWidth, window.innerHeight) * 0.8;
    this.canvas.width = this.size;
    this.canvas.height = this.size;
  }

  createContext() {
    const dpr = window.devicePixelRatio;
    this.context = this.canvas.getContext('2d');
    this.context.scale(dpr, dpr);
  }

  fillBackground() {
    this.context.fillStyle = '#f5ebdc';
    this.context.fillRect(0,0, this.size, this.size);
  }

  getRandomBigInt(max) {
    const min = 0;
    max = max || this.size;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getRandomPoints(numberOfPoints) {
    numberOfPoints = numberOfPoints || this.getRandomBigInt(10);
    return Array(numberOfPoints).fill().map(() => {
      return {
        x: this.getRandomBigInt(),
        y: this.getRandomBigInt()
      }
    });
  }

  // getRandomSmallFloat(rate) {
  //   rate = rate || 6;
  //   return (Math.random() * rate).toFixed(2);
  // }



  drawLine(color) {
    // this.context.beginPath();
    // this.context.arc(this.getRandomBigInt(), this.getRandomBigInt(), 5, 0, Math.PI*2, true);
    // this.context.closePath();
    // this.context.fillStyle = color;
    // this.context.fill();
    const points = this.getRandomPoints(5);
    this.context.beginPath();
    this.context.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length - 2; i++) {
      let xNew = (points[i].x + points[i + 1].x) / 2;
      let yNew = (points[i].y + points[i + 1].y) / 2;
      this.context.quadraticCurveTo(points[i].x, points[i].y, xNew, yNew);
    }
    this.context.strokeStyle = color;
    this.context.stroke();
  }

  paint(color) {
    let counter = 0;
    let maxCounter = this.getRandomBigInt(100);

    let interval = setInterval(()=> {
      counter = counter + 1;
      this.drawLine(color);
      counter == maxCounter && clearInterval(interval);
    }, 100)
  }
}
