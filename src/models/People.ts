import * as dynamoose from "dynamoose"
dynamoose.aws.sdk.config.update({
  "accessKeyId": process.env.AWS_ACCESS_KEY_ID,
  "secretAccessKey": process.env.AWS_SECRET_ACCESS_KEY_ID,
  "region": process.env.AWS_REGION
});

const schema = new dynamoose.Schema({
  "id": String,
  "name": String,
  "age": Number
}, {
  "saveUnknown": true,
  "timestamps": true
});

export default dynamoose.model("People", schema);

