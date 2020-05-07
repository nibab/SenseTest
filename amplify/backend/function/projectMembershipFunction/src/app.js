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
var authSnaptestbd08bf8bUserPoolId = process.env.AUTH_SNAPTESTBD08BF8B_USERPOOLID
var apiSenseTestApiGraphQLAPIIdOutput = process.env.API_SENSETESTAPI_GRAPHQLAPIIDOUTPUT
var apiSenseTestApiGraphQLAPIEndpointOutput = process.env.API_SENSETESTAPI_GRAPHQLAPIENDPOINTOUTPUT

Amplify Params - DO NOT EDIT */

const https = require('https');
const AWS = require("aws-sdk");
const urlParse = require("url").URL;
var apiSenseTestApiGraphQLAPIIdOutput = process.env.API_SENSETESTAPI_GRAPHQLAPIIDOUTPUT
var apiSenseTestApiGraphQLAPIEndpointOutput = process.env.API_SENSETESTAPI_GRAPHQLAPIENDPOINTOUTPUT
const appsyncUrl = apiSenseTestApiGraphQLAPIEndpointOutput;
const region = process.env.REGION;
const endpoint = new urlParse(appsyncUrl).hostname.toString();
const createUserMutation = require('./createUserMutation.js').mutation;
const createUserProjectMutation = require('./createProjectUserMutation.js').mutation;
const cognito = new AWS.CognitoIdentityServiceProvider({apiVersion: '2016-04-18'})
const ses = new AWS.SES({apiVersion: '2010-12-01'})
// Exceptions
const USERNAME_EXISTS_EXCEPTION = "UsernameExistsException"
const GRAPH_QL_ERROR = "TransactionError"
// 



var express = require('express')
var bodyParser = require('body-parser')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

//Generate temp password
const generateTempPassword = (length) => {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

// util for graphql queries
const graphQlQuery = async function(object, query, queryName) {
  const appsync_req = new AWS.HttpRequest(appsyncUrl, region);

  appsync_req.method = "POST";
  appsync_req.headers.host = endpoint;
  appsync_req.headers["Content-Type"] = "application/json";
  appsync_req.body = JSON.stringify({
    query: query,
    operationName: queryName,
    variables: {
      input: object
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
        console.log("GraphQL error: " + JSON.parse(e.toString()))
        reject(GRAPH_QL_ERROR)
      });
    });

    httpRequest.write(appsync_req.body);
    httpRequest.end();
  });
  return _data
}

const getUser = function(userId) {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await cognito.adminGetUser({
        UserPoolId: process.env.AUTH_SNAPTESTBD08BF8B_USERPOOLID,
        Username: userId,
      }).promise()
      resolve(user)
    } catch(e) {
      reject()
    }
  })
}

const createUser = function(email, temporaryPassword) { 
  return new Promise(async (resolve, reject) => {
    try {
      const user = await cognito.adminCreateUser({
        UserPoolId: process.env.AUTH_SNAPTESTBD08BF8B_USERPOOLID,
        Username: email,
        TemporaryPassword: temporaryPassword,
        MessageAction: "SUPPRESS",
        UserAttributes: [{"Name":"email", "Value": email}]
      }).promise()
      resolve(user)
    } catch(e) {
      if (e.code === USERNAME_EXISTS_EXCEPTION) { 
        console.log("User already exists. Full error: " + e.toString()) 
        reject(USERNAME_EXISTS_EXCEPTION)
      } else { 
        console.log("Something bad happened." + e.toString()) 
        reject()
      }
    }
  })
}

const sendUserInvitedToProjectEmail = async function(sender, email, subject, projectId) {
  const email_params = {
    Destination: { /* required */
      ToAddresses: [
        email,
      ]
    },
    Message: { /* required */
      Body: { /* required */
        Html: {
         Charset: "UTF-8",
         Data: `
          <h3>Invite</h3>
          <p>
            <b>${sender}</b> has invited you to a project on <a href='https://prerelease.io'>prerelease.io</a>. 
          </p>

          <p>
            <a href='https://app.prerelease.io/project/${projectId}'>Click here to view the project</a>
          </p>
        `
        }
       },
       Subject: {
        Charset: 'UTF-8',
        Data: subject
       }
      },
    Source: 'prerelease.io <admin@prerelease.io>', /* required */
    ReplyToAddresses: [
       'support@prerelease.io',
    ],
  };
  const emailResult = await ses.sendEmail(email_params).promise()
}

const sendNewUserEmail = async function(sender, email, subject, temporaryPassword) {
  const email_params = {
    Destination: { /* required */
      ToAddresses: [
        email,
      ]
    },
    Message: { /* required */
      Body: { /* required */
        Html: {
         Charset: "UTF-8",
         Data: `
          <h3>Invite</h3>
          <p>
            <b>${sender}</b> has invited you to a project on <a href='https://prerelease.io'>prerelease.io</a>. 
          </p>
          <p>
          Your temporary password is: ${temporaryPassword}
          
          </p>
          
          <p>
            <a href='https://app.prerelease.io'>Click here to view it</a>
          </p>
        `
        }
       },
       Subject: {
        Charset: 'UTF-8',
        Data: subject
       }
      },
    Source: 'prerelease.io <admin@prerelease.io>', /* required */
    ReplyToAddresses: [
       'support@prerelease.io',
    ],
  };
  const emailResult = await ses.sendEmail(email_params).promise()
}

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

app.post('/testEmail', async function(req, res) {
  await sendNewUserEmail('Cezar Babin', 'czbabin@gmail.com', 'Cezar Babin invited you to prerelease.io')
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

app.post('/testUserCreation', async function(req, res) {
  // await sendEmail('Cezar Babin', 'czbabin@gmail.com', 'Cezar Babin invited you to prerelease.io')
  // Add your code here
  const response = (await getUser('71543523-5157-4102-a63d-087c9cb76bf0'))['Username']
  // let creatorEmail
  // for (let i in response) {
  //     let attribute = response[i]
  //     if (attribute['Name'] === 'email') {
  //       creatorEmail = attribute['Value']
  //     }
  //   }
  console.log(response)
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

app.post('/createUser', async function(req, res, next) {
  const userId = req.apiGateway.event.requestContext.authorizer.claims.sub
 
  try {
    const user = await getUser(userId)
    const creatorAttributes = user['UserAttributes']
    let userEmail
    for (let i in creatorAttributes) {
      let attribute = creatorAttributes[i]
      if (attribute['Name'] === 'email') {
        userEmail = attribute['Value']
      }
    }
    
    const name = (req.body["userName"])
    const newUser = {
      id: userId,
      name: name,
      email: userEmail
    }
    const userMutation = await graphQlQuery(newUser, createUserMutation, 'createUser') 
  } catch (err) {
    if (err === GRAPH_QL_ERROR) {
      
    } else {
     
    }
    let error = new Error(err);
    error.statusCode = 500;
    next(error)
  }
 
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
}) 

app.post('/createAndInviteUser', async function(req, res, next) {
  //const projectId = 'b5f5c81d-648e-4138-98bc-317833370980'
  //const email = 'ilarionababii+9@gmail.com'
  const email = (req.body["userEmail"]).toLowerCase() // 1
  const projectId = req.body["projectId"] 
  const creatorUserId = req.apiGateway.event.requestContext.authorizer.claims.sub

  let creatorName
  try {
    const creator = await getUser(creatorUserId)
    const creatorAttributes = creator['UserAttributes']
    
    for (let i in creatorAttributes) {
      let attribute = creatorAttributes[i]
      if (attribute['Name'] === 'custom:name') {
        creatorName = attribute['Value']
      }
    }
    console.log(creatorName)
    console.log('Creator ' + JSON.stringify(creator['UserAttributes']))
    const temporaryPassword = generateTempPassword(8)
    const createUserResult = await createUser(email, temporaryPassword)  
    console.log('User result is ' + JSON.stringify(createUserResult))
    const userId = createUserResult["User"]["Username"]
    const user = {
      id: userId,
      name: 'unavailable',
      email: email
    }
    const userMutation = await graphQlQuery(user, createUserMutation, 'createUser')
    await sendNewUserEmail(creatorName, email, `${creatorName} invited you to prerelease.io`, temporaryPassword)
    
    const userProjectEdge = {
      id: userId+projectId,
      projectUserEdgeUserId: userId,
      projectUserEdgeProjectId: projectId
    }
    const userProjectEdgeMutation = await graphQlQuery(userProjectEdge, createUserProjectMutation, 'createUserProjectEdge')
    
  } catch(e) {
    if (e === USERNAME_EXISTS_EXCEPTION) {
      const username = (await getUser(email))['Username']
      const userProjectEdge = {
        id: username+projectId,
        projectUserEdgeUserId: username,
        projectUserEdgeProjectId: projectId
      }
      try {
        const userProjectEdgeMutation = await graphQlQuery(userProjectEdge, createUserProjectMutation, 'createUserProjectEdge')
      
        sendUserInvitedToProjectEmail(creatorName, email, `${creatorName} invited you to a project on prerelease.io`, projectId)
      } catch(err) {
        let userExistsInTheProjectError = new Error(e);
        userExistsInTheProjectError.statusCode = 409;
        next(userExistsInTheProjectError)
        return
      }
    } else {
      let err = new Error(e);
      err.statusCode = 500;
      console.log(e)
      next(err)
      return
    }
   
  }
 
  // Add your code here
  res.json({success: 'post call succeed!'})
});


app.post('/users/create', async function(req, res) {
  // Add your code here

  

  const user = {
    id: '2',
    name: 'cez',
    email: 'yo'
  }
  
  const userProjectEdge = {
    projectUserEdgeUserId: 'eee52550-e1bf-401c-8482-c4a87e0bf07e',
    projectUserEdgeProjectId: '4bcf1985-fce6-44b0-8d1e-9087da138d91'
  }

  //const userMutation = await graphQlQuery(user, createUserMutation, 'createUser')
  const userProjectEdgeMutation = await graphQlQuery(userProjectEdge, createUserProjectMutation, 'createUserProjectEdge')
  //const gql = await persistUserInAppSync(user)
  console.log("BLEA response " + JSON.stringify(userProjectEdgeMutation))

  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

app.post('/item/*', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
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
