import React, { Component } from 'react';
import './Snake.css';

class Snake extends Component {
  constructor(props) {
    super();
    this.state = {score: 0, best: 0};
    this.w = 500;
    this.h = 500;
    this.size = 20;
    this.fps = 10;
    this.dx = 1;
    this.dy = 0;
    this.p = {x:10, y:10};
    this.a = {x: 15, y: 15}
    this.trail = [];
    this.tail = 5;

    document.addEventListener('keydown', this.pressButtonHandler.bind(this));
    window.addEventListener('beforeunload', this.save.bind(this));
  }
  componentDidMount() {
    this.ctx = this.refs.snake.getContext("2d");
    let bestScore = +localStorage.getItem('snake_best_score');

    if (typeof bestScore === 'number') {
      this.setState({ best: bestScore });
    }
    this.step();
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutId);
    this.save();
  }

  save() {
    localStorage.setItem('snake_best_score', this.state.best);
  }

  pressButtonHandler(e) {
    switch(e.keyCode) {
      case 37:
        if (this.dx === 1) break;
        this.dx = -1; this.dy = 0;
        break;
      case 38:
        if (this.dy === 1) break;
        this.dx = 0; this.dy = -1;
        break;
      case 39:
        if (this.dx === -1) break;
        this.dx = 1; this.dy = 0;
        break;
      case 40:
        if (this.dy === -1) break;
        this.dx = 0; this.dy= 1;
        break;
      default:
    }
  }
  step() {
    this.timeoutId = setTimeout(() => {
      this.ctx.clearRect(0, 0, this.w, this.h);
      this.p.x += this.dx;
      this.p.y += this.dy;
      
      if (this.p.x * this.size > this.w - 1) {
        this.p.x = 0;
      }

      if (this.p.y * this.size > this.h - 1) {
        this.p.y = 0;
      }

      if (this.p.x  < 0) {
        this.p.x = this.w / this.size;
      }

      if (this.p.y < 0) {
        this.p.y = this.h / this.size;
      }

      this.ctx.fillStyle = "green";
      this.trail.forEach(item => {
        this.ctx.fillRect(item.x * this.size, item.y * this.size, this.size - 1, this.size - 1);
        if (this.p.x === item.x && this.p.y === item.y) {
          this.tail = 5;
          this.setState({score: 0});
        }
      });

      this.trail.push({x: this.p.x, y: this.p.y});

      while(this.trail.length > this.tail) {
        this.trail.shift();
      }

      if (this.p.x === this.a.x && this.p.y === this.a.y) {
        this.tail++;
        this.a.x = Math.floor(Math.random() * this.w / this.size);
        this.a.y = Math.floor(Math.random() * this.h / this.size);

        this.setState(prevState => ({
            score: prevState.score + 1
          }));

        if (this.state.score > this.state.best) {
          this.setState(prevState => ({
            best: prevState.score
          }));
        }
      }

      this.ctx.fillStyle = 'red';
      this.ctx.fillRect(this.a.x * this.size, this.a.y * this.size, this.size - 1,  this.size -1);


      this.step();
    }, 1000 / this.fps);
  }
  render() {
    return (
      <div>
        <div>
          <div className="score">Best:{('000' + this.state.best).slice(-4)}</div>
          <div className="score">Score:{('000' + this.state.score).slice(-4)}</div>
        </div>
        <canvas ref="snake" width={this.w} height={this.h}></canvas>
      </div>
    );
  }
}

export default Snake;