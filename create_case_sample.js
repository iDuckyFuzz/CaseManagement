/**
 *
 * Script-Name: create_case_sample
 */

var mastercom = require('mastercard-mastercom');
var MasterCardAPI = mastercom.MasterCardAPI;
var ResourceConfig = mastercom.ResourceConfig

var consumerKey = "9Rsc4hJ6g3IFSjVHVYJLBVdYkgRBNJa4hC6xVwnn26751c3f!93c987584caa409ea7995996bf69885a0000000000000000";   // You should copy this from "My Keys" on your project page e.g. UTfbhDCSeNYvJpLL5l028sWL9it739PYh6LU5lZja15xcRpY!fd209e6c579dc9d7be52da93d35ae6b6c167c174690b72fa
var keyStorePath = "/Users/samwi/Desktop/Case Management/MCD_Sandbox_MasterCom_API_Keys/MasterCom-sandbox.p12"; // e.g. /Users/yourname/project/sandbox.p12 | C:\Users\yourname\project\sandbox.p12
var keyAlias = "keyalias";   // For production: change this to the key alias you chose when you created your production key
var keyPassword = "keystorepassword";   // For production: change this to the key alias you chose when you created your production key

// You only need to do initialize MasterCardAPI once
//
var authentication = new MasterCardAPI.OAuth(consumerKey, keyStorePath, keyAlias, keyPassword);
MasterCardAPI.init({
    sandbox: true,
    debug: true,
    authentication: authentication
});
// This is needed to change the environment to run the sample code. For production, remove the next line and pass sandbox: false in the init() function.
MasterCardAPI.setEnvironment("sandbox");


var requestData = {
  "caseType": "4",
  "chargebackRefNum": [
    "1111423456",
    "2222123456"
  ],
  "customerFilingNumber": "5482",
  "violationCode": "D.2",
  "violationDate": "2017-11-13",
  "disputeAmount": "200.00",
  "currencyCode": "USD",
  "fileAttachment": {
    "filename": "test.tif",
    "file": "sample file"
  },
  "filedAgainstIca": "004321",
  "filingAs": "A",
  "filingIca": "001234",
  "memo": "This is a test memo",
  "messageText": "This is a test message",
  "changeReasonCodeFlag": "Y",
  "updatedChargebackReasonCode": "4863",
  "changeReasonCodeReason": "This is a test reason"
};
mastercom.CaseFiling.create(requestData
, function (error, data) {
    if (error) {
        err("HttpStatus: "+error.getHttpStatus());
        err("Message: "+error.getMessage());
        err("ReasonCode: "+error.getReasonCode());
        err("Source: "+error.getSource());
        err(error);

    }
    else {
        out(data.caseId); //-->536092
    }
});


function out(value) {
  console.log(value);
}

function outObj(item, key) {
  console.log(item[key]);
}

function err(value) {
  console.error(value);
}