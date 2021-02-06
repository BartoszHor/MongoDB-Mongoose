const Employee = require('../employees.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

after(() => {
    mongoose.models = {};
  });

describe('Employee', () => {

    it('should throw an error if no args', () => {
        const employee = new Employee({}); 

        employee.validate(err => {
            expect(err.errors.firstName).to.exist;
            expect(err.errors.lastName).to.exist;
            expect(err.errors.department).to.exist;
        });
    });

    it('should throw an error if args are not string type', () => {

          const employee = new Employee({ firstName: {}, lastName: [], department: [] });
      
          employee.validate(err => {
            expect(err.errors.firstName).to.exist;
            expect(err.errors.lastName).to.exist;
            expect(err.errors.department).to.exist;
          });
      
      });

    it('should not throw an error if required args are supplied', () => {

          const employee = new Employee({ firstName: 'Bartosz', lastName: 'Horoba', department: 'IT' });
      
          employee.validate(err => {
            expect(err).to.not.exist;
          });      
      });
});