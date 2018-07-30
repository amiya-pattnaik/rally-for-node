
const rallyUtl    = require('../../lib/rally-for-node');

var rallyConnectInfo = {
  // RALLY_USERNAME:       'yourID@yourcompany.com',       //required if no api key, defaults to process.env.RALLY_USERNAME
  // RALLY_PASSWORD:       'rally123';                     //required if no api key, defaults to process.env.RALLY_PASSWORD
  RALLY_API_KEY:        '_SNjdjjdjdjdjdsPlCDbkULZjdgsnd',  //user's apikey based on the RALLY userID
  REQUEST_OPTIONS: {    //REQUEST_OPTIONS required if you want to pass header info. Else can be ignored
    headers: {
      'X-RallyIntegrationName': 'My automation project',  //while optional, it is good practice
      'X-RallyIntegrationVendor': 'My company name',      //provide this header information
      'X-RallyIntegrationVersion': '1.0'
    }
    //any additional request options (proxy options, timeouts, etc.) pass it as part of header info
  },
};

var RALLY_WORKSPACE_ID    = 89772661323;
var RALLY_PROJECT_ID      = 903123719967;
var RALLY_WORK_PRODUCT_ID = 892254055789;


describe('rally utilities methods: ', function () {
  //this.timeout(30000);

  it("should create a new testcase result on the specified testcase", function (done){

    rallyUtl.createTestCaseResult(rallyConnectInfo, 'TC12345', 'build 1.0.4', 'Pass', 'tested by QA_User1234');

    setTimeout(done, 10000);
  });

});
