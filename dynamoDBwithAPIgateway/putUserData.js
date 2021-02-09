
'use strict'
const AWS = require('aws-sdk');

AWS.config.update( { region : "us-east-2"} )


exports.handler = async (event, context) =>{
   
    const db = new AWS.DynamoDB({apiVersion : "2012-10-08"})
    //using document client bcoz dynamoDB gives json which is corresponding to dynamoDB
    const documentClient = new AWS.DynamoDB.DocumentClient({region : "us-east-2"});

    let responseBody = "";
    let statusCode = 0;
    
    const {id,firstName ,lastName} = JSON.parse(event.body);
    const params = {
        TableName : 'Users',
        Item : {
            id : id,
            firstName : firstName,
            lastName : lastName
        }
    }
    try{
        const data = await documentClient.put(params).promise();
        responseBody =  JSON.stringify(data.Item);
        statusCode = 201;

    }
    catch(err){
        responseBody = `unable to put user data`;
        statusCode = 403;
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
