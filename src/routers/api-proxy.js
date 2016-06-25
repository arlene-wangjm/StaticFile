var express = require('express');
var apiProxyRouter = express.Router();
var JsonSerialize;

JsonSerialize = function JsonSerialize(jsonString) {
    if (typeof jsonString !== 'string' && typeof jsonString !== 'object') {
        throw new Error('JsonSerialize error: couldn\'t serialize', jsonString);
    }

    if (typeof jsonString === 'string') {
        return JSON.parse(jsonString);
    }

    if (typeof jsonString === 'object') {
        return jsonString;
    }
}

apiProxyRouter.post('/login', (req, res) => {

    res.json({message: 'otp validated', __stub: true});

});

apiProxyRouter.post('/gateway/autobahn/v1/cors/user/register', (req, res) => {

    res.json({
        "challenge": "MDAwMDAwNDCJ2cJheVqBfrxNMSkgNQCbdMIAml2kYi3O59MlirRjJmWIqNcX1Cyl",
        "arcotId": "MIID1gIBAAwPTEVXSVMxMjM0NTY3ODkwMIIDvDCCA7gCAQEMBkFSQ0FSRKCCAVowHQYKYIZIAYb5RgkBATAPBAACAQEDAQACAWgCAglIBIIBNzCCATMCAQAwDgYKYIZIAYb5RgkCAAUABIIBHDCCARgCggEBALtYDN+U0dniq27lMVbNabZznIa3/naeN8zMshRZ0uoVn4HEleLq1BVL8FTq0IfpDA0z6sOo5mUmkqIA5mTki4N57ua2R1SauoYH7HcfKhi8of48bKzN/Xw9R6snG54PLLOjIoaQ4BMmrSFWJTfB2jFG0QaF90JRtafoRdcU3RBNsvOdwPQK0bpHnPUOBT+rSMuDYo2jLoB27vzrZp/Xkk35DUHuDEEstTVJBUCE/G3FERRJRafwdY9C5+acV+kAqkZfcMH0ID4o/JN2VwN/Z4ASX41DKHRhn4ecvBybgJ/5dOOaClmsyZIVW5294fuuB2s1WqPuhmRbtz+Ni8jsd5sCEQCnBkco+tLaLi2RuaFM7uLvooIB+zCCAWSgAwIBAgIRAP5sD1av6Uz4r7q7vEvG9+EwDQYJKoZIhvcNAQEEBQAwIDEOMAwGA1UECwwFQXJjb3QxDjAMBgNVBAoMBUFyY290MB4XDTE2MDUyNDAwMDAwMVoXDTM2MDUxOTIzNTk1OVowVzEVMBMGCgmSJomT8ixkAQEMBTUyNDAwMSQwIgYDVQQKDBtGSURFTElUWVwyRE9OTElORVwyREVJXDJEVUsxGDAWBgNVBAMMD0xFV0lTMTIzNDU2Nzg5MDCBnzANBgkqhkiG9w0BAQEFAAOBjQAwgYkCgYEA5SVRWi5jfZYyJapYfwEWBJNcc8ZEb782i3NjJdpaw/A60zUK7IakoVR8MgcExuwrO4Azbwi26kpJaOGyjn4BpfJWDlHFj3jdYU1FXx35yFPLXIZKZp4siN+AMJOzuDNKCNUhWo/5KDSGN7+JDRLrGuJVWVYwdzMMjpUULcdobTMCAwEAATANBgkqhkiG9w0BAQQFAAOBgQB62+Vy39DMMnLKTsuqaXPs9M/qPu3SqoPPFjI2eb/E+ZeddPEehpECOmMiMVKf+JOceNFqG8MFi206qjbiHwYHxn0dc3wq7Smspx1L5I0dVT5B3C265vktZ0v3Qf6q3hxMXUKjiqOdvboWREPQZQ60dAOw/VJOzsZvu1Yv+aH9TqNOMBwWA09yZwQVRklERUxJVFktT05MSU5FLUVJLVVLMBkWBnVzZXJpZAQPTEVXSVMxMjM0NTY3ODkwMBMWDmFpZGF0dHJ2ZXJzaW9uBAEwMAA=",
        "crn": "500006125094",
        "secondaryCRN": "",
        "deviceID": "DZo4NzOL8adI+Dwlr3Jhoi/In4beD8+fhIyuk0knDhNSfZXXYME8it4NEQ2nm99a",
        "webInvestorID": "10240560",
        "otp": "466695",
        "__stub": true,
        "KYC": {
            "Score": "0",
            "Advice": "REFER"
        }

    });

});

module.exports = apiProxyRouter;
