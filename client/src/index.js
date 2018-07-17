import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { yuyv2rgba } from './helpers/yuyv2rgba'

const WIDTH  = 352;
const HEIGHT = 288;

function paintCanvas() {
  const canvas = document.createElement('canvas')

  const c2d = canvas.getContext('2d')

  document.getElementById('video').appendChild(canvas)

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
    paintCanvas()
  }

  render() {
    return (
      <div className="video-stream">
        <div id="video"></div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
