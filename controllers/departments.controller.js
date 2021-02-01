const Department = require('../models/departments.model');


exports.getAll = async (req, res) => {
    try {
      res.json(await Department.find());
    } catch(err) {
      res.status(500).json({message: err})
    }
  
  }

  exports.getRandom = async (req, res) => {
    try {
  
      const dep = await Department.findOne().skip(Math.floor(Math.random() * await Department.countDocuments()))
      if(!dep) res.status(404).json({message: 'Not found'})
      else res.json(dep)
    } catch(err) {
      res.status(500).json({message: err})
    }
  
  }

  exports.getDepById = async (req, res) => {
    try {
      const dep = await Department.findById(req.params.id)
      if(!dep) res.status(404).json({message: 'Not found'})
      else res.json(dep)
    } catch(err) {
      res.status(500).json({message: err})
    }
    
  }

  exports.postDep = async (req, res) => {
    try {
  
      const { name } = req.body
      const newDepartment = new Department({ name: name })
      await newDepartment.save()
      res.json({message: 'OK'})
    } catch(err) {
      res.status(500).json({message: err})
    }
  
  }

  exports.changeDepById = async (req, res) => {
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
  
  }

  exports.deleteDep = async (req, res) => {

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
  
  }