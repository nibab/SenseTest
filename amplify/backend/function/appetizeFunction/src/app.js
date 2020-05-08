/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/


/* Amplify Params - DO NOT EDIT
You can access the following resource attributes as environment variables from your Lambda function
var environment = process.env.ENV
var region = process.env.REGION

Amplify Params - DO NOT EDIT */

const request = require('axios')
const https = require('https');
const AWS = require("aws-sdk");
const urlParse = require("url").URL;
var apiSenseTestApiGraphQLAPIIdOutput = process.env.API_SENSETESTAPI_GRAPHQLAPIIDOUTPUT
var apiSenseTestApiGraphQLAPIEndpointOutput = process.env.API_SENSETESTAPI_GRAPHQLAPIENDPOINTOUTPUT
const appsyncUrl = apiSenseTestApiGraphQLAPIEndpointOutput;
const region = process.env.REGION;
const endpoint = new urlParse(appsyncUrl).hostname.toString();
const graphqlQuery = require('./mutation.js').mutation;
var express = require('express')
var bodyParser = require('body-parser')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

const APPETIZE_API_TOKEN = "tok_z8gprz7vfgdgqudeu8gtnvvetr"

// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
});


/**********************
 * Example get method *
 **********************/

app.get('/item', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

app.get('/item/*', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

/****************************
* Example post method *
****************************/

app.post('/item', async function(req, res) {
  const appsync_req = new AWS.HttpRequest(appsyncUrl, region);

  const item = { 
    input: {
      assetId: "1", 
      name: "2", 
      appetizeKey: "2", 
      version: "4",
      uploadedByUserId: "5"
    }
  };

  appsync_req.method = "POST";
  appsync_req.headers.host = endpoint;
  appsync_req.headers["Content-Type"] = "application/json";
  appsync_req.body = JSON.stringify({
      query: graphqlQuery,
      operationName: "createAppBuild",
      variables: item
  });
  
  console.log(JSON.stringify(appsync_req))
    
  try {
    const signer = new AWS.Signers.V4(appsync_req, "appsync", true);
    signer.addAuthorization(AWS.config.credentials, AWS.util.date.getDate());
  } catch (e) {
    console.log("ERROR when signing the request: " + e)
  }

  const data = await new Promise((resolve, reject) => {
    const httpRequest = https.request({ ...appsync_req, host: endpoint }, (result) => {
      result.on('data', (_data) => {
        resolve(JSON.parse(_data.toString()));
      });
      result.on('error', (e) => {
        console.error(e);
        reject(JSON.parse(e.toString()))
      });
    });

    httpRequest.write(appsync_req.body);
      httpRequest.end();
  });
  
  res.json({
    statusCode: 200,
    body: data
  })

});

app.post('/addAppBuild', async function(req, res) {
  const appBuildId = req.body['appBuildId']
  const assetId = req.body["assetId"] // 1
  const assetUrl = req.body["assetUrl"] // "https://appetizetest.s3.amazonaws.com/MovieSwift.zip"
  const appName = req.body["appName"] // 'testName'
  const appVersion = req.body["appVersion"] //  'testVersion'
  const userId =  req.apiGateway.event.requestContext.authorizer.claims.sub
  const projectId = req.body["projectId"]
  
  const data = {
    "url": assetUrl,
    "platform": "ios",
    "timeout": 300,
    "note": "CI build #42"
  }
  
  const persistAppBuildMetadata = async function(item) {
    const appsync_req = new AWS.HttpRequest(appsyncUrl, region);

    appsync_req.method = "POST";
    appsync_req.headers.host = endpoint;
    appsync_req.headers["Content-Type"] = "application/json";
    appsync_req.body = JSON.stringify({
        query: graphqlQuery,
        operationName: "createAppBuild",
        variables: {
          input: item
        }
    });
    
    try {
      const signer = new AWS.Signers.V4(appsync_req, "appsync", true);
      signer.addAuthorization(AWS.config.credentials, AWS.util.date.getDate());
    } catch (e) {
      console.log("ERROR when signing the request: " + e)
    }
  
    const _data = await new Promise((resolve, reject) => {
      const httpRequest = https.request({ ...appsync_req, host: endpoint }, (result) => {
        result.on('data', (_data) => {
          resolve(JSON.parse(_data.toString()));
        });
        result.on('error', (e) => {
          console.error(e);
          reject(JSON.parse(e.toString()))
        });
      });
  
      httpRequest.write(appsync_req.body);
        httpRequest.end();
    });
    return _data
  }
  
  const newItem = {
    id: appBuildId,
    assetId: assetId, 
    name: appName, 
    version: appVersion,
    uploadedByUserId: userId !== undefined ? userId : 'noCognitoCredentials',
    appBuildProjectId: projectId
  }
  
  if (userId !== undefined) {
    const response = await new Promise((resolve, reject) => {
      request.post(`https://${APPETIZE_API_TOKEN}@api.appetize.io/v1/apps`, data).then(async (response) => {
        const item = {
          ...newItem,
          appetizeKey: response.data['publicKey'] 
        }
        console.log("Graphql item " + JSON.stringify(item))
        const graphqlResponse = await persistAppBuildMetadata(item)
        console.log("Graphql response: " + JSON.stringify(graphqlResponse))
        
        const _response = {
          ...response.data,
          appBuildId: graphqlResponse.data.createAppBuild.id
        }
        
        resolve(_response)
      }).catch((error) => {
         if (error) {
            console.error(error)
            reject(error)
          }
      })
    })
    // Add your code here
    res.json({statusCode:response["statusCode"], body: response})
  } else {
    // Add your code here
    res.json({statusCode:401, body: 'Missing authentication data'})
  }
  
  

  
});

/****************************
* Example put method *
****************************/

app.put('/item', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

app.put('/item/*', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

/****************************
* Example delete method *
****************************/

app.delete('/item', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.delete('/item/*', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
