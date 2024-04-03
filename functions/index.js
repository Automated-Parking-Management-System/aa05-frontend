/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require("firebase-functions/v2/https")
const { onObjectFinalized } = require("firebase-functions/v2/storage");
const logger = require("firebase-functions/logger");
const admin = require("firebase-admin");

// Random libraries i tried
// const jsqr = require("jsqr")

// const Jimp = require("jimp");

admin.initializeApp();


// Listens for any stuff that gets added to storage and then runs the call back
exports.detectQR_code = onObjectFinalized(async (event) => {
  if (event.data.contentType.startsWith("image/")) { // Checking if whatevr was added was an image
    const bucket = admin.storage().bucket(event.data.bucket);
    const file = bucket.file(event.data.name);

    // Download the image file
    const tempFilePath = `/tmp/${event.data.name}`;
    await file.download({ destination: tempFilePath });

    //-----------------Commented this out, TODO: Decode image here------------------------------#
    // // Use Jimp to read the image and convert it to a bitmap
    // const image = await Jimp.read(tempFilePath);
    // const { data, width, height } = image.bitmap;

    // // Create a Uint8ClampedArray from the image data
    // const imageData = {
    //   data: new Uint8ClampedArray(data),
    //   width,
    //   height,
    // };

    // // Use jsqr to decode the QR code from the image data
    // const qrCode = jsqr(imageData.data, imageData.width, imageData.height);
    // logger.log(qrCode);
    // if (qrCode) {
    //   logger.log("QR code detected:", qrCode.data);
    //  else {
    //   logger.log("No QR code detected.");
    // }
  } else {
    logger.log("Object is not an image.");
  }
});


// Simple listener
exports.helloWorld = onRequest((request, response) => {
  logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

// Listener just returns the number of files in storage
exports.getStorageFileCount = onRequest(async (request, response) => {
  try {
    const [files] = await bucket.getFiles();
    const fileCount = files.length;

    files.map(element => logger.log(element.name));

    response.status(200).send(`Number of files in storage: ${fileCount}`);
  } catch (error) {
    logger.error(error);
    response.status(500).send("Error getting file count");
  }
});

