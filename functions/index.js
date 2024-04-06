/**
 * 
 * Firebase Cloud Functions
 */


const { onRequest } = require("firebase-functions/v2/https");
const { onObjectFinalized } = require("firebase-functions/v2/storage");
const logger = require("firebase-functions/logger");
const admin = require("firebase-admin");
const Jimp = require("jimp");
const jsQR = require("jsqr");
const { bucket } = require("firebase-functions/v1/storage");

const admin_app = admin.initializeApp();
const db = admin.database();
const secret_key = "JdeQsCeNA1T3ZQaUtQhcHGf1s343";


function unshuffle(reversed) {
  let str = reversed.split('');

  for (let i = str.length - 1; i >= 1; i--) {
      for (let j = str.length - 1; j >= i; j--) {
          let temp = str[j];
          str[j] = str[j - 1];
          str[j - 1] = temp;
      }
  }
  return str.join('');
}

// Listens for any stuff that gets added to storage and then runs the call back
exports.detectQR_code = onObjectFinalized(async (event) => {
  const bucket = admin.storage().bucket(event.data.bucket); 
  const file = bucket.file(event.data.name);
  let qrDetected = false;

  if (event.data.contentType.startsWith("image/")) { // Checking if whatevr was added was an image
    const tempFilePath = `/tmp/${event.data.name}`;
    await file.download({ destination: tempFilePath });
    const image = await Jimp.read(tempFilePath);
    const qrCodeValue = jsQR(image.bitmap.data, image.bitmap.width, image.bitmap.height); // qr code obj


    if (qrCodeValue !== null) {
      
      let verify = false;
      qrDetected = true;
      
      const decoded_qr_code = unshuffle(qrCodeValue.data);
      const users = await admin_app.auth().listUsers(1000);

      for (let user of users.users) {
        if (decoded_qr_code.includes(user.uid)) verify = true;
      }
      
      if (verify) {
        const qrCodeDataRef = db.ref(`${secret_key}/entranceAuth`);  
        
        // Sets the entrance auth to true
        await qrCodeDataRef.set(true)
        .catch(e => {
          logger.error(e);
        })
        
      }
      
    } else {
      console.log('No QR code found in the image.');
    }

  } else {
    logger.log("Object is not an image.");
  }

  if (!qrDetected) {  // Trying to delete images that were not detected as qr codes
    try {
      await file.delete();  
    } catch (error) {
      logger.log(error);
    }
  } 
  
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

