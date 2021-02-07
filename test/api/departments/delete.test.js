const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const Department = require('../../../models/departments.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('DELETE /api/departments/:id', () => {
    before(async () => {
        const testDepOne = new Department({ _id: '5d9f1140f10a81216cfd4408', name: 'Department #1' });
        await testDepOne.save();
      });
    
      it('/:id should delete chosen document and return success', async () => {
        const res = await request(server).delete('/api/departments/5d9f1140f10a81216cfd4408');
        const updatedDepartment = await Department.findById({_id: '5d9f1140f10a81216cfd4408'})
        expect(res.status).to.be.equal(200);
        expect(res.body).to.not.be.null;
        expect(updatedDepartment).to.be.null
      });
    
    after(async () => {
    await Department.deleteMany();
    });

});