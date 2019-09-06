const express = require('express');
const router = express.Router();

let Exercise = require('../../models/exercise.model');

router.get('/', (req, res) => {
  Exercise.find().then(exercises => res.json(exercises))
  .catch(err => res.status(400).json(`Error!: ${err}`))
})

router.post('/add', (req, res) => {
  const { username, description, duration, date } = req.body;
  const durationParsed = Number(duration);
  const dateParsed = Date.parse(date);

  const newExercise = new Exercise({
    username,
    description,
    duration: durationParsed,
    date: dateParsed,
  });

  newExercise.save()
  .then(() => res.json('Exercise is successfully added!'))
  .catch(err => res.status(400).json(`Error!: ${err}`))
})

module.exports = router;