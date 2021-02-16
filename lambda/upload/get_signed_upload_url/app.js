'use strict';

const AWS = require('aws-sdk');
AWS.config.update({ region: process.env.AWS_REGION || 'us-east-1' });
const s3 = new AWS.S3();

const getUploadURL = async (type, name) => {
  const file = parseInt(Math.random() * 10000000);
  const params = {
    Bucket: process.env.UploadBucket,
    Key: name,
    ContentType: type,
  };
  
  let signed = await s3.getSignedUrl('putObject', params);

  return { signed, file };
};

exports.handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    throw new Error(
      `getAllItems only accept GET method, you tried: ${event.httpMethod}`
    );
  }
  console.log('event', event, event['queryStringParameters'])
  let request = event['queryStringParameters'];
  let type = request['type'];
  let name = request['name'];

  const { signed, file } = await getUploadURL(type, name);
  const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({
      upload_url: signed,
      filename: `${file}.jpg`
    }),
  };

  return response;
};
