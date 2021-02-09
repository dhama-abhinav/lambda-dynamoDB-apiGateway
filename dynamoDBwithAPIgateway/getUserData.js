
'use strict'
const AWS = require('aws-sdk');

AWS.config.update( { region : "us-east-2"} )


exports.handler = async (event, context) =>{
   
    const db = new AWS.DynamoDB({apiVersion : "2012-10-08"})
    //using document client bcoz dynamoDB gives json which is corresponding to dynamoDB
    const documentClient = new AWS.DynamoDB.DocumentClient({region : "us-east-2"});

    let responseBody = "";
    let statusCode = 0;

    const { id } = event.pathParameters;

    const params = {
        TableName : 'Users',
        Key : {
            id : id
        }
    }
    try{
       const data = await documentClient.get(params).promise();
       responseBody =  JSON.stringify(data.Item);
       statusCode = 200;

    }
    catch(err){
        responseBody = `unable to get user data`;
        statusCode = 400;
    }

    const response= {
        statusCode : statusCode,
        headers : {
            "myHeader" : "test"
        },
        body : responseBody
    }
    return response;

}