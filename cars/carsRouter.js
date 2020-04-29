const express = require('express')

const router = express.Router()

const db = require('./carsModel')

// create account
router.post('/', (req, res) => {
  const {vin, make, model, mileage} = req.body
  const newCar = req.body

  if ({vin, make, model, mileage}) {
    db.insert(newCar)
      .then(() => { // SUCCESS
        res.status(201).json(newCar)
      })
      .catch(err => { // saving car failed
        console.log(err)
        res.status(500).json({ error: "There was an error while saving the car to the database" })
      })
  } else { // info missing
    res.status(400).json({ errorMessage: "Please provide vin, make, model, mileage for the car." })
  }
})


// read all cars
router.get('/', (req, res) => {
  db.find()
    .then(cars => { // SUCCESS
      res.status(200).json(cars)
    })
    .catch(err => { // can't find cars
      console.log(err)
      res.status(500).json({ error: "The cars could not be retrieved." })
    })
  })


// read car by id
router.get('/:id', (req, res) => {
  db.findById(req.params.id)
    .then(cars => {
      if (cars) {
        res.status(200).json(cars)
      } else {
        res.status(404).json({ message: "The car with the specified ID does not exist." })
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: "The car could not be retrieved." })
    })})


// update cars
router.put('/:id', (req, res) => {
  const {vin, make, model, mileage} = req.body

  const updatedCarInfo = req.body // set new car info

  if ({vin, make, model, mileage}) { // check for required info
    
    const requestedCar = db.findById(req.params.id) // grab car

    if (requestedCar) {
      db.update(req.params.id, req.body)
      .then(() => { // SUCCESS
        res.status(200).json(updatedCarInfo)
      })
      .catch(err => { // if update fails
        console.log(err)
        res.status(500).json({ error: "The car information could not be modified." })
      })
    } else { // id isn't valid
      res.status(404).json({ message: "The car with the specified ID does not exist." })
    }

  } else { // missing info
    res.status(400).json({ errorMessage: "Please provide vin, make, model, mileage for the car." })
  }
})


// delete 
router.delete('/:id', (req, res) => {
  const carToDelete = db.findById(req.params.postId) // grab relevant car

  if (carToDelete) {
    db.remove(req.params.postId)
      .then(removedCar => { // SUCCESS
        res.sendStatus(204).json(removedCar)
      })
      .catch(err => { // if removing car fails
        res.status(500).json({ error: "The car could not be removed" })
      })
  } else { // if car isn't found
    res.status(404).json({ message: "The car with the specified ID does not exist." })
  }
})


module.exports = router