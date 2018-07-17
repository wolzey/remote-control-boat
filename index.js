const express  = require('express')
const socketio = require('socket.io')
const http     = require('http')
const SerialPort = require('serialport')

const app = express()
const server = http.Server(app)
const port = process.env.PORT || 3001


const port = new SerialPort('/dev/ttyACM0', { baudRate: 9600 }, (err) => {
  if (err) {
    console.log('Cannot connect')
    return
  }
})

port.on('open', () => {
  console.log("Port is open")
})

const sendArduino = (data) => {
  port.write(data)
}

server.listen(port, () => {
  console.log(`Listening on ${port}`)
  sendArduino('A')
})

// io.on('connection', () => {
//   console.log('User connected')

//   socket.on('light control', (data) => {
//     sendArduino(data)
//   })
// })
