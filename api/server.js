const express = require('express')

// import routers

const carsRouter = require('../cars/carsRouter')

// init server
const server = express();
server.use(express.json())

// routing
server.use('/cars', carsRouter)

server.get('/', (req, res) => {
  res.send('ready...')
})

module.exports = server