
const assert      = require('assert');
const rallyUtl    = require('../../lib/rally-for-node');
const rallyconf   = require('../../lib/rally.conf');


describe('rally utilities methods: ', function () {
  this.timeout(30000);

  it("should create a new testcase result on the specified testcase", function (done){
    rallyUtl.createTestCaseResult('TC633873', 'build 1.0.2', 'Pass', 'tested by QA_User1');
    setTimeout(done, 10000);
  });

});
