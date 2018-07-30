## rally-for-node
rally-for-node makes use of the rally library and as such boasts a comprehensive REST request capability for interacting with RALLY through common methods. It provides a wide range of capabilities for querying, along with methods for creating, reading, updating, and deleting individual items. That's all there is to it.!

## Installation

`npm install rally-for-node`

## Example

var rallyUtl = require('rally-for-node');
```
var rallyConnectInfo = {
  RALLY_USERNAME:       'e067343@mastercard.com',       //required if no api key, defaults to process.env.RALLY_USERNAME
  RALLY_PASSWORD:       'rally123';                     //required if no api key, defaults to process.env.RALLY_PASSWORD
  RALLY_API_KEY:        '_SNCq7FT9SVSlg5lnPO9qTFtPlCDbkULZncaW64OqQtw',  //user's apikey based on the RALLY userID
  REQUEST_OPTIONS: {    //REQUEST_OPTIONS required if you want to pass header info. Else can be ignored
    headers: {
      'X-RallyIntegrationName': 'My automation project',  //while optional, it is good practice
      'X-RallyIntegrationVendor': 'My company name',      //provide this header information
      'X-RallyIntegrationVersion': '1.0'
    }
    //any additional request options (proxy options, timeouts, etc.) pass it as part of header info
  },
};

var RALLY_WORKSPACE_ID    = 46772661387;
var RALLY_PROJECT_ID      = 193123719952;
var RALLY_WORK_PRODUCT_ID = 232254055348;
```

`Creates test cases at the story level`
@param {rallyConnectInfo} , RALLY connction info thet is required to authenticate user
@param {projectID} the project id upon which new testcase will be created
@param {workProductID}  the workProductID (i.e. Rally Story ID) on which new  testcase will be created
@param {testcaseName} the name of the testcase you want to provide
`rallyUtl.createTestcaseInStory(rallyConnectInfo, RALLY_PROJECT_ID, RALLY_WORK_PRODUCT_ID, 'new teast case for story');`

`Creates defect at the story level`
@param {rallyConnectInfo} , RALLY connction info thet is required to authenticate user
@param {projectID} the project id upon which new testcase will be created
@param {workProductID}  the workProductID (i.e. Rally Story ID) on which new  testcase will be created
@param {defectName} the name of the defect you want to provide
`rallyUtl.createDefectInStory(rallyConnectInfo, RALLY_PROJECT_ID, RALLY_WORK_PRODUCT_ID, 'creating a defect in a story');`

`Creates a new test result for a testcase`
@param {rallyConnectInfo} , RALLY connction info thet is required to authenticate user
@param {testcaseID} the testcaseID upon which new test result will be added
@param {build}  the build number that needs to be added
@param {verdict} the status of the test case i.e. Pass / Fail / Blocked / Error / Inconclusive
@param {notes}  the notes which needs to be added
`rallyUtl.createTestCaseResult(rallyConnectInfo, 'TC123456', 'build 1.0.4', 'Pass', 'tested by QA_User112');`

`Updates last test run result of a testcase`
@param {rallyConnectInfo} , RALLY connction info thet is required to authenticate user
@param {testcaseID} the testcaseID upon which last test run result will be updated
@param {build}  the build number that needs to be updated
@param {verdict} the status of the test case i.e. Pass / Fail / Blocked / Error / Inconclusive
@param {notes}  the notes which needs to be updated
`rallyUtl.updateTestCaseLastResult(rallyConnectInfo, 'TC839883', 'testresult_build', 'Pass', 'testresult_notes');`

`Updates the existing defect`
@param {rallyConnectInfo} , RALLY connction info thet is required to authenticate user
@param {defectID} the defectID upon which update will be made
@param {name} the name of the defect upon which update will be made
@param {verdict} the status of the defect i.e. Closed / Blocked etc.
@param {notes}  the notes which needs to be updated
`rallyUtl.updateDefectResult(rallyConnectInfo, 'DE993077', 'my new defect123', 'Closed', 'updating the existing defect');`

`Adds a new defect to the existing test case`
@param {rallyConnectInfo} , RALLY connction info thet is required to authenticate user
@param {testcaseID} the testcaseID upon which new defect will be associated
@param {defectName} the name of the defect
`rallyUtl.addDefectToTestcase(rallyConnectInfo, 'TC889343', 'creating a new defect on a testcase - feb -12');`

`Delete testcase or a defect (either from a test case or from a story)`
@param {rallyConnectInfo} , RALLY connction info thet is required to authenticate user
@param {objectType} the type of the object; either from a test case or from a story
@param {RALLY_WORKSPACE_ID} the workspaceID  optional, only required if deleting in non-default workspace, else ignore it.
`rallyUtl.delectObject(rallyConnectInfo, 'TestCase', 'TC900088', RALLY_WORKSPACE_ID);`
`rallyUtl.delectObject(rallyConnectInfo, 'Defect', 'DE108368');`

## Contribution

Create a fork of the project into your own repository. Make all your necessary changes and create a pull request with a description on what was added or removed and details explaining the changes in lines of code. If approved, project owners will merge it.

## Licensing

MIT
