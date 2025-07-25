const express = require('express');
const multer = require('multer');
const { uploadFile, listFiles } = require('../services/gcpStorage');
const { Storage } = require('@google-cloud/storage');
const path = require('path');

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

async function uploadBufferToGCP(buffer, destFileName) {
  const gcpStorage = new Storage({
    keyFilename: path.join(__dirname, process.env.GOOGLE_SERVICE_KEY),
  });

  const bucket = gcpStorage.bucket('elegant_event');
  const file = bucket.file(destFileName);

  await file.save(buffer, {
    contentType: 'image/jpeg', 
  });

  await file.makePublic();

  return `https://storage.googleapis.com/elegant_event/${destFileName}`;
}


router.post('/', upload.single('image'), async (req, res) => {
  try {
    const buffer = req.file.buffer;
    const originalName = req.file.originalname;
    const destFileName = `images/${Date.now()}-${originalName}`;

    const publicUrl = await uploadBufferToGCP(buffer, destFileName);
    res.status(200).json({ message: 'Upload successful', url: publicUrl });
  } catch (error) {
    console.error('Upload failed:', error);
    res.status(500).json({ error: 'Upload failed' });
  }
});


router.get('/', async (req, res) => {
  try {
    const files = await listFiles();
    res.json(files);
  } catch (error) {
    res.status(500).json({ error: 'Could not list files' });
  }
});

module.exports = router;
