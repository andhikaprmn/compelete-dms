import formidable from "formidable";

import {
  uploadFileToS3,
  getBucketListFromS3,
  getPresignedURL,
} from "./s3-service.js";

const readFormData = async (req) => {
  return new Promise((resolve) => {
    const dataObj = {};
    const form = formidable();
    form.parse(req);

    form.on("file", (name, file) => {
      dataObj.name = name;
      dataObj.file = file;
    });

    form.on("end", () => {
      resolve(dataObj);
    });
  });
};

export const s3Upload = async (req, res) => {
  const formData = await readFormData(req);
  const file = formData.file;

  try {
    const publicUrl = await uploadFileToS3(file, "dms");
    res.json({ publicUrl: publicUrl });
  } catch (ex) {
    res.send("ERROR!!!!");
  }
};

export const s3Get = async (req, res) => {
  try {
    const bucketData = await getBucketListFromS3("dms");
    const { Contents = [] } = bucketData;
    res.send(
      Contents.map((content) => {
        return {
          key: content.Key,
          size: (content.Size / 1024).toFixed(1) + " KB",
          lastModified: content.LastModified,
        };
      })
    );
  } catch (ex) {
    res.send([]);
  }
};

export const getSignedUrl = async (req, res) => {
  try {
    const { key } = req.params;
    const url = await getPresignedURL("dms", key);
    res.send(url);
  } catch (ex) {
    res.send("Gagal mendapatkan url");
  }
};
