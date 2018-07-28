## rally-for-node

rally-for-node makes use of the rally library and as such boasts a comprehensive REST request capability for interacting with RALLY through common methods. It provides a wide range of capabilities for querying, along with methods for creating, reading, updating, and deleting individual items. That's all there is to it.!

## Installation

`npm install rally-for-node`


## Example

var rally = require('rally-for-node');

//it creates a new test result for a testcase
createTestCaseResult(testcaseID, build, verdict, notes);
@param {testcaseID} the testcaseID upon which new test result will be added
@param {build}  the build number that needs to be added
@param {verdict} the status of the test case i.e. Pass / Fail
@param {notes}  the notes which needs to be added


rallyUtl.createTestCaseResult('TC633873', 'build 1.0.2', 'Pass', 'tested by QA_User1');



## Contribution

Create a fork of the project into your own repository. Make all your necessary changes and create a pull request with a description on what was added or removed and details explaining the changes in lines of code. If approved, project owners will merge it.

## Licensing

MIT
