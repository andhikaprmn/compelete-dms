import AWS from "aws-sdk";
import { createReadStream } from "fs";
import { awsCreds } from "./s3-config.js";
import { uuid } from "uuidv4";
import { extname } from "path";

const createS3Instance = () => {
  const s3 = new AWS.S3({
    credentials: {
      accessKeyId: awsCreds.accessKey,
      secretAccessKey: awsCreds.secretKey,
    },
    region: "us-east-1",
    endpoint: "https://s3.jagoanstorage.com/",
    sslEnabled: false,
    s3ForcePathStyle: true,
  });
  return s3;
};

export const uploadFileToS3 = async (fileObj, bucketName) => {
  const s3 = createS3Instance();
  const fileKey = uuid() + extname(fileObj.originalFilename);
  const fileStream = createReadStream(fileObj.filepath);
  const params = {
    Body: fileStream,
    Bucket: bucketName,
    Key: fileKey,
    ACL: "public-read",
    ContentType: fileObj.mimetype,
  };
  await s3.upload(params).promise();

  const publicUrl = `https://global.jagoanstorage.com/${bucketName}/${fileKey}`;
  return publicUrl;
};

export const getBucketListFromS3 = async (bucketName) => {
  const s3 = createS3Instance();
  const params = {
    Bucket: bucketName,
    MaxKeys: 10,
  };

  const bucketData = s3.listObjects(params).promise();
  return bucketData || {};
};

export const getPresignedURL = async (bucketName, key) => {
  const s3 = createS3Instance();
  const params = {
    Bucket: bucketName,
    Key: key,
    Expires: 60,
  };

  const preSignedURL = s3.getSignedUrl("getObject", params);
  return preSignedURL;
};
