import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { paintCanvas } from './helpers/paintCanvas'

class App extends Component {

  componentDidMount() {
    paintCanvas(this.canvas)
  }

  render() {
    return (
      <div className="video-stream">
        <canvas ref={(canvas) => {this.canvas = canvas}} className="video-canvas" width='352' height='288'></canvas>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
