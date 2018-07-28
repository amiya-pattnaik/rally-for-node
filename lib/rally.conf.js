
//Environment variable RALLY_API_KEY (or RALLY_USERNAME and RALLY_PASSWORD)
//must be defined to actually run

//An api key can be generated by going to https://rally1.rallydev.com/login


exports.RALLY_USERNAME        =  'yourUserName@yourCompany.com';      //required if no api key, defaults to process.env.RALLY_USERNAME
exports.RALLY_PASSWORD        = 'rally123';                           //required if no api key, defaults to process.env.RALLY_PASSWORD
exports.RALLY_API_KEY         = '_Snnkdheg5lnPO0PlCDbkULZncahhee';    //user's apikey based on the userID
exports.RALLY_WORKSPACE_ID    = 49772622387;          //only required if creating in non-default workspace
exports.RALLY_PROJECT_ID      = 97490715800;          //rally object's project id on which operation will be made
exports.RALLY_WORK_PRODUCT_ID = 99459258331;         //rally object's storyID(WorkProduct) id on which operation will made


//to either create testcase result or to update testcase last results
exports.testresult_build   = 'build-Feb-01';
exports.testresult_notes   = 'ran-through-automation-testing-Feb-01';