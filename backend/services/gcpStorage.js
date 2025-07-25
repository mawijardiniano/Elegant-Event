const { Storage } = require('@google-cloud/storage');
const path = require('path');

const keyPath = path.join(__dirname, process.env.GOOGLE_SERVICE_KEY);
const storage = new Storage({ keyFilename: keyPath });
const bucketName = 'elegant_event';
const bucket = storage.bucket(bucketName);

async function uploadBuffer(buffer, destFileName, contentType = 'image/jpeg') {
  const file = bucket.file(destFileName);

  await file.save(buffer, { contentType });
  await file.makePublic();

  return `https://storage.googleapis.com/${bucketName}/${destFileName}`;
}

async function listFiles() {
  const [files] = await bucket.getFiles();
  return files.map((file) => ({
    name: file.name,
    url: `https://storage.googleapis.com/${bucketName}/${file.name}`,
  }));
}

module.exports = { uploadBuffer, listFiles };