const Employee = require('../models/employees.model')


exports.getAll = async (req, res) => {
    try {
      res.json( await Employee.find().populate('department'))
    } catch(err) {
      res.status(500).json({message: err})
    }
  
  }

  exports.getRandom = async (req, res) => {
    try {
      const employee = await Employee.findOne().populate('department').skip(Math.floor(Math.random() * await Employee.countDocuments()))
      if(!employee) res.status(404).json({message: 'Not found'})
      else res.json(employee)
    } catch(err) {
      res.status(500).json({message: err})
    }
  
  }

  exports.getEmployeeById = async (req, res) => {
    try {
      const employee = await Employee.findById(req.params.id).populate('department')
      if(!employee) res.status(404).json({message: 'Not found'})
      else res.json(employee)
    } catch(err) {
      res.status(500).json({message: err})
    }
  }

  exports.postEmployee = async (req, res) => {
    try {
      const {firstName, lastName, department} = req.body
      const newEmployee = new Employee({firstName: firstName, lastName: lastName, department: department})    
      newEmployee.save()
      res.json({message: 'OK'})
    } catch(err) {
      res.status(500).json({message: err})
    }
   
  }

  exports.changeEmployeeById = async (req, res) => {
    const {firstName, lastName, department} = req.body
    try {
    const employee = await(Employee.findById(req.params.id))
      if(employee) {
        employee.lastName = lastName
        employee.firstName = firstName
        employee.department = department
        await employee.save()
        res.json({message: 'OK'})
      } 
      else res.status(404).json({message: 'Not found'})
    } 
    catch(err) {
      res.status(500).json({message: err})
    }
  
  }

  exports.deleteEmployee = async (req, res) => {
    try {
      const employee = await Employee.findById(req.params.id)
        if(employee) {
          await employee.remove()
          res.json({message: 'OK'})
        } 
        else res.status(404).json({message: 'Not found'})
      } 
      catch(err) {
        res.status(500).json({message: err})
      }
  }