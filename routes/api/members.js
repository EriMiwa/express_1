const express = require('express');
const router = express.Router();
const uuid = require('uuid');

const members = require('../../Members');


router.get('/', (req, res) => 
  res.json(members)
);

router.get('/:id', (req, res) => {
  //returns boolean
  const found = members.some(
    (member) => member.id === parseInt(req.params.id)
  )

  if(found) {
    res.json(members.filter(member => member.id === parseInt(req.params.id)))

  } else {
    res.status(400).json({ msg: `member with ${req.params.id}: id is not found.`})
  }
})

router.post('/', (req, res) => {
  console.log('request body', req.body)
  const newData = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
  };

  members.push(newData);
  res.json(members);
})

//update a member (email or name)
router.put('/:id', (req, res) => {
 
})

// delete a member with id
router.delete('/:id', (req, res) => {

})

module.exports = router;
