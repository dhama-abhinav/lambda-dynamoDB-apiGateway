
'use strict'
const AWS = require('aws-sdk');

AWS.config.update( { region : "us-east-2"} )


exports.handler = async (event, context) =>{
   
    const db = new AWS.DynamoDB({apiVersion : "2012-10-08"})
    //using document client bcoz dynamoDB gives json which is corresponding to dynamoDB
    const documentClient = new AWS.DynamoDB.DocumentClient({region : "us-east-2"});

    const params = {
        TableName : 'Users',
        Item : {
            id : "12345",
            firstName : "abhinav",
            lastName : "dhama"
        }
    }
    try{
       const data = await documentClient.put(params).promise();
       console.log(data)

    }
    catch(err){
        console.log(err)
    }

}
