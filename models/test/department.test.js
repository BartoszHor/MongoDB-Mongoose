const Department = require('../departments.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

after(() => {
    mongoose.models = {};
  });

describe('Department', () => {

    it('should throw an error if no "name" arg', () => {
        const dep = new Department({}); 

        dep.validate(err => {
        expect(err.errors.name).to.exist;
        });
    });

    it('should throw an error if "name" is not a string', () => {

        const cases = [{}, []];
        for(let name of cases) {
          const dep = new Department({ name });
      
          dep.validate(err => {
            expect(err.errors.name).to.exist;
          });
      
        }
      
      });

    it('should throw an error if "name" has more then 20 charactes', () => {
        const dep = new Department({ name: '#'.repeat(21) });
    
        dep.validate(err => {
        expect(err.errors.name).to.exist;
        });    
    });
    it('should throw an error if "name" has less then 5 charactes', () => {
        const dep = new Department({ name: '#'.repeat(4) });
    
        dep.validate(err => {
        expect(err.errors.name).to.exist;
        });    
    });
    it('should not throw an error if "name" is okay', () => {

        const cases = ['Board', 'Sales'];
        for(let name of cases) {
          const dep = new Department({ name });
      
          dep.validate(err => {
            expect(err).to.not.exist;
          });
      
        }
      
      });
});