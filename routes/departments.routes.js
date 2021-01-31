const express = require('express');
const router = express.Router();
const Department = require('../models/departments.model')

router.get('/departments', async (req, res) => {
  try {
    res.json(await Department.find());
  } catch(err) {
    res.status(500).json({message: err})
  }

});

router.get('/departments/random', async (req, res) => {
  try {

    const dep = await Department.findOne().skip(Math.floor(Math.random() * await Department.countDocuments()))
    if(!dep) res.status(404).json({message: 'Not found'})
    else res.json(dep)
  } catch(err) {
    res.status(500).json({message: err})
  }

});

router.get('/departments/:id', async (req, res) => {
  try {
    const dep = await Department.findById(req.params.id)
    if(!dep) res.status(404).json({message: 'Not found'})
    else res.json(dep)
  } catch(err) {
    res.status(500).json({message: err})
  }
  
});

router.post('/departments', async (req, res) => {
  try {

    const { name } = req.body
    const newDepartment = new Department({ name: name })
    await newDepartment.save()
    res.json({message: 'OK'})
  } catch(err) {
    res.status(500).json({message: err})
  }

});

router.put('/departments/:id', async (req, res) => {
  const { name } = req.body;

  try {
    await Department.findOneAndUpdate({_id: req.params.id}, {$set: {name: name}}, (a, doc) => {
      if(!doc) {
        res.status(404).json({message: 'Not found'})
      } else res.json({message: doc})
    })
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

});

router.delete('/departments/:id', async (req, res) => {

  try {
    const dep = await(Department.findById(req.params.id));
    if(dep) {
      await Department.deleteOne({ _id: req.params.id });
      res.json({ message: dep });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

});

module.exports = router;
