/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// @ts-nocheck


const { onRequest } = require("firebase-functions/v2/https")
const { onObjectFinalized } = require("firebase-functions/v2/storage");
// const rtdb = require("firebase/database")
const logger = require("firebase-functions/logger");
const admin = require("firebase-admin");
const Jimp = require("jimp");
const jsQR = require("jsqr");
const { set } = require("firebase/database");


admin.initializeApp();
const db = admin.database();

// Listens for any stuff that gets added to storage and then runs the call back
exports.detectQR_code = onObjectFinalized(async (event) => {
  if (event.data.contentType.startsWith("image/")) { // Checking if whatevr was added was an image
    const bucket = admin.storage().bucket(event.data.bucket);
    const file = bucket.file(event.data.name);
    const tempFilePath = `/tmp/${event.data.name}`;

    await file.download({ destination: tempFilePath })

    const image = await Jimp.read(tempFilePath);

    const qrCodeValue = jsQR(image.bitmap.data, image.bitmap.width, image.bitmap.height);

    if (qrCodeValue) {
      const qrCodeDataRef = db.ref(`QR-Code/${qrCodeValue.data}`);
    
      qrCodeDataRef.get()
        .then(snapshot => {
          const qrCodeStatus = snapshot.val();
    
          if (qrCodeStatus === null) {
            throw new Error("Couldn't fetch the code");
          } else if (qrCodeStatus === false) {
            return qrCodeDataRef.set(true); // Setting the value directly
          }
        })
        .catch((err) => logger.error(err));
    } else {
      console.log('No QR code found in the image.');
    }

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

