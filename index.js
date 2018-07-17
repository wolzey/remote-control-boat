const express  = require('express')
const socketio = require('socket.io')
const http     = require('http')
const SerialPort = require('serialport')


const app = express()
const server = http.Server(app)
const port = process.env.PORT || 3001

const arduinoPort = new SerialPort('/dev/ttyACM0', { baudRate: 9600 }, (err) => {
  if (err) {
    console.log('Cannot connect')
    return
  }
})

let v4l2camera = null
let cam;
let feed = null;

const v4l2camera = require("v4l2camera");
const cam = new v4l2camera.Camera("/dev/video0");
if (cam.configGet().formatName !== "MJPG") {
  console.log("NOTICE: MJPG camera required");
  process.exit(1);
}

// app.get('/video-feed', (req, res) => {
//   let buffer = Buffer(cam.toYUYV());
//   res.set({
//     "content-type": "image/vnd-raw",
//     "content-length": buffer.length,
//   });
//   res.send(buffer);
// });

arduinoPort.on('open', () => {
  console.log("Port is open")
  setTimeout(() => sendArduino('A'), 1000)
})

arduinoPort.on('data', (data) => {
  console.log(data.toString('utf8'))
})

const sendArduino = (data) => {
  arduinoPort.write(data)
}

server.listen(port, () => {
  console.log('Server listening on port', port)
})
