
var rally       = require('rally');
var queryUtils  = rally.util.query;
var refUtils    = rally.util.ref;
var rallyconf   = require('./rally.conf.js');

var  request = rally({
  user:       rallyconf.RALLY_USERNAME,     //required if no api key, defaults to process.env.RALLY_USERNAME
  pass:       rallyconf.RALLY_PASSWORD,     //required if no api key, defaults to process.env.RALLY_PASSWORD
  apiKey:     rallyconf.RALLY_API_KEY,      //preferred, required if no user/pass, defaults to process.env.RALLY_API_KEY
  apiVersion: 'v2.0',                       //this is the default and may be omitted
  server: 'https://rally1.rallydev.com',    //this is the default and may be omitted
});


module.exports = {

//working as expected, it creates test cases at the story level
createTestcaseInStory: function (projectID, workProductID, testcaseName) {
  request.create({
    type: 'TestCase',     //the type to create
    data: {
        Name: testcaseName,               //the data with which to populate the new object
        Project: '/project/'+projectID,                          //the project id on which testcase will be created
        WorkProduct: '/hierarchicalrequirement/'+workProductID,  //the storyID(WorkProduct) id on which testcase will be created
    },
    fetch: ['FormattedID'],   //the fields to be returned on the created object
    requestOptions: {}        //optional additional options to pass through to request
}, function(error, result) {
    if(error) {
        console.log(error);
    } else {
        //console.log(result.Object.FormattedID);
        console.log('*** a new testcase: '+ result.Object.FormattedID+' has been created under the story ID: '+workProductID +' ***');
    }
  });
},

//working as expected, defect is being created at the story level
createDefectInStory: function (projectID, workProductID, defectName) {
  request.create({
    type: 'defect', //the type to create
    data: {
        Name:        defectName,              //the name of the defect with to populate with new object
        Project:     '/project/'+projectID,                      //the project id on which testcase will be created
        Requirement: '/hierarchicalrequirement/'+workProductID,  //the storyID(WorkProduct) id on which testcase will be created
    },
    fetch: ['FormattedID'],   //the fields to be returned on the created object
    requestOptions: {}        //optional additional options to pass through to request
}, function(error, result) {
      if(error) {
          console.log(error);
      } else {
          //console.log(result.Object);
          console.log('*** a new defect: '+ result.Object.FormattedID+' has been created ***');
      }
  });
},

//working as expected, it creates a new test result for a testcase
// @param {testcaseID} the testcaseID upon which new test result will be added
// @param {build}  the build number that needs to be added
// @param {verdict} the status of the test case i.e. Pass / Fail / Blocked / Error / Inconclusive
// @param {notes}  the notes which needs to be added

createTestCaseResult: function (testcaseID, build, verdict, notes){
  var date          = new Date();
  var _ref_testcaseresult  = '';
  request.query({
    type:     'TestCase',         //the type to query
    fetch:    ['FormattedID'],    //the fields to be returned on the created object
    query:    queryUtils.where('FormattedID', '=', testcaseID),
  }, function(error, queryRes) {
      if(error) {
          console.log(error);
      } else {
        _ref_testcase = queryRes.Results[0]['_ref'].split('/testcase/')[1];
      }
      request.create ({
        type: 'TestCaseResult',             //the type to create
        data: {
            Build:    build,                //this is for testcaseresult
            Verdict:  verdict,              //this is for testcaseresult
            Notes:    notes,                //this is for testcaseresult
            Date:     date.toISOString(),   //takes current system time
            Testcase: '/testcase/'+_ref_testcase,
        },
      }, function(error, result) {
            if(error) {
                console.log(error);
            } else {
              console.log('*** test result created successfully ! ***');
            }
        });   //end of create block
     });      //end of query block
},

//working as expected, last test run result is being updated
// @param {testcaseID} the testcaseID upon which last test run result will be updated
// @param {build}  the build number that needs to be updated
// @param {verdict} the status of the test case i.e. Pass / Fail / Blocked / Error / Inconclusive
// @param {notes}  the notes which needs to be updated
updateTestCaseLastResult: function (testcaseID, build, verdict, notes){
  var date          = new Date();
  var _ref_testcaseresult  = '';
  request.query({
    type:     'TestCase',     //the type to query
    start:    1,              //the 1-based start index, defaults to 1
    pageSize: 2,              //the page size (1-200, defaults to 200)
    limit:    10,             //the maximum number of results to return- enables auto paging
    order:    'Rank',         //how to sort the results
    fetch:    ['LastResult'], //the fields to be returned on the created object
    query:    queryUtils.where('FormattedID', '=', testcaseID),
  }, function(error, queryRes) {
      if(error) {
          console.log(error);
      } else {
        _ref_testcaseresult = queryRes.Results[0]['LastResult']['_ref'].split('/testcaseresult/')[1];
      }
      request.update({
        ref: '/testcaseresult/'+_ref_testcaseresult,
        data: {
            Build:    build,      //this is for testcaseresult and getting updated
            Verdict:  verdict,              //this is for testcaseresult and getting updated
            Notes:    notes,      //this is for testcaseresult and getting updated
            Date:     date.toISOString(),   //takes current system time
            //Tester: 'TestUser',           // wiill be automatically updated based on the RALLY user login
        },
      }, function(error, result) {
            if(error) {
                console.log(error);
            } else {
              //console.log(result.Object);
              console.log('*** test result updated successfully ! ***');
            }
        });   //end of update block
     });      //end of query block
},

//working as expected, defect is updated
updateDefectResult: function (defectID, name, state, description){
  var date          = new Date();
  var _ref_defect  = '';
  request.query({
    type:     'Defect',       //the type to query
    start:    1,              //the 1-based start index, defaults to 1
    pageSize: 2,              //the page size (1-200, defaults to 200)
    limit:    10,             //the maximum number of results to return- enables auto paging
    order:    'Rank',         //how to sort the results
    fetch:    ['Defects'],    //the fields to be returned on the created object
    query:    queryUtils.where('FormattedID', '=', defectID),
  }, function(error, queryRes) {
      if(error) {
          console.log(error);
      } else {
        _ref_defect = queryRes.Results[0]['_ref'].split('/defect/')[1];
      }
      request.update({
        ref: '/Defect/'+_ref_defect,
        data: {
            Name:   name,      //this is for defect and getting updated
            State:  state,     //this is for defect and getting updated
            Description: description,
        },
      }, function(error, result) {
            if(error) {
                console.log(error);
            } else {
              //console.log(result.Object);
              console.log('*** defect is updated successfully ! ***');
            }
        });   //end of update block
     });      //end of query block
},

//working as expected and adding defect to the existing defect against a test case
addDefectToTestcase: function (testcaseID, defectName){
  //adds defect to a testcase (for example which is listed under the `Details for TC626066`)
  request.query({
    type:     'TestCase',     //the type to query
    start:    1,              //the 1-based start index, defaults to 1
    pageSize: 2,              //the page size (1-200, defaults to 200)
    limit:    10,             //the maximum number of results to return- enables auto paging
    order:    'Rank',         //how to sort the results
    fetch:    ['Project'],    //the fields to be returned on the created object
    query:    queryUtils.where('FormattedID', '=', testcaseID),
  }, function(error, queryRes) {
        if(error) {
          console.log(error);
        } else {
          _ref_testcase = queryRes.Results[0]['_ref'].split('/testcase/')[1];
          _ref_project  = queryRes.Results[0].Project['_ref'].split('/project/')[1];
        }
        request.add ({
          ref: '/testcase/'+_ref_testcase,         //the object which owns the collection- in this case the parent story
          collection: 'Defects',                   //the name of the collection being added to
          data: [
              {
                Name: defectName,                  //add a new defect
                project: '/project/'+_ref_project  //require, the project id to add the collection
              }
          ],
          // scope: {
          //     project: '/project/'+_ref_project      //optional, only required if creating in non-default workspace
          // },
          fetch: ['FormattedID', 'Name', 'State'],      //the fields to retrieve in the results
          //requestOptions: {} //optional additional options to pass through to request
      }, function (error, result) {
            if(error) {
              console.log(error);
            } else {
              defectid = result.Results[0].FormattedID;
              console.log('*** defect: '+defectid + ' created for the testcase: '+testcaseID+' successfully ! ***');
            }
        });     //end of add block
    });         //end of query block
},

//working fine. delete testcase and defect (either from a test case or from a story)
delectObject: function (objectType, objectID){
  objectType = objectType.toLowerCase();
  request.query({
    type:     objectType,     //the type to query
    start:    1,              //the 1-based start index, defaults to 1
    pageSize: 2,              //the page size (1-200, defaults to 200)
    limit:    10,             //the maximum number of results to return- enables auto paging
    order:    'Rank',         //how to sort the results
    query:    queryUtils.where('FormattedID', '=', objectID),
  }, function(error, queryRes) {
        if(error) {
          console.log(error);
        } else {
          console.log(queryRes);
          _ref = queryRes.Results[0]['_ref'].split('/'+objectType+'/')[1];
        }
        request.del({
          ref: '/'+objectType+'/'+_ref,     //may be a ref ('/defect/1234' or '/testcase/123456') or an object with a _ref property
          scope: {
              workspace: '/workspace/'+rallyconf.RALLY_WORKSPACE_ID  //optional, only required if deleting in non-default workspace
          },
          requestOptions: {} //optional additional options to pass through to request
        }, function(error, result) {
            if(error) {
              console.log(error);
            } else {
              console.log('the specified '+objectType +':' +objectID +' is being deleted');
            }
          });
    });
},

}// end of module
