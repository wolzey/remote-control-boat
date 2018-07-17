import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { paintCanvas } from './helpers/paintCanvas'

import { yuyv2rgba } from './helpers/yuyv2rgba'

const WIDTH  = 352;
const HEIGHT = 288;

export function paintCanvas(canvas) {
  const c2d = canvas.getContext('2d')

  (function load() {
    let req = new XMLHttpRequest()
    req.responseType = "arraybuffer"
    req.addEventListener('load', async () => {
      const yuyvRaw = new Uint8Array(req.response)
      const rgbaRaw = await yuyv2rgba(yuyvRaw, new Uint8ClampedArray(405504), WIDTH, HEIGHT)
      const imageData = new ImageData(rgbaRaw, WIDTH, HEIGHT)
      c2d.putImageData(imageData, 0, 0)
      setTimeout(load, 35)
    }, false);
    req.open("GET", "/video-feed", true)
    req.send()
  })()
}

class App extends Component {

  componentDidMount() {
    paintCanvas(this.canvas)
  }

  render() {
    return (
      <div className="video-stream">
        <canvas ref={(canvas) => {this.canvas = canvas}} id="video-canvas" className="video-canvas" width='352' height='288'></canvas>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
