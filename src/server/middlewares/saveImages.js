const fs = require("fs");
const path = require("path");
const { initializeApp } = require("firebase/app");
const {
  uploadBytes,
  ref,
  getDownloadURL,
  getStorage,
} = require("firebase/storage");
const { getActualDateAndTime } = require("../utils/getActualDateAndTime");

const firebaseConfig = {
  apiKey: "AIzaSyCTThV1dX2d6IZC-5_bl8eHs0Lg98gE7HQ",
  authDomain: "valencia-sin-gluten.firebaseapp.com",
  projectId: "valencia-sin-gluten",
  storageBucket: "valencia-sin-gluten.appspot.com",
  messagingSenderId: "1017162231140",
  appId: "1:1017162231140:web:b0213fc4f33bc1d9f59e71",
};

const firebaseApp = initializeApp(firebaseConfig);

const saveImages = async (req, res, next) => {
  const { file } = req;

  const newImageName = file
    ? `${getActualDateAndTime()}-${file.originalname}`
    : "";
  let firebaseFileURL;

  if (file) {
    await fs.rename(
      path.join("uploads", "images", file.filename),
      path.join("uploads", "images", newImageName),
      async (error) => {
        if (error) {
          next(error);
          return;
        }

        await fs.readFile(
          path.join("uploads", "images", newImageName),
          async (readError, readFile) => {
            if (readError) {
              next(readError);
              return;
            }
            const storage = getStorage(firebaseApp);

            const storageRef = ref(storage, newImageName);

            const metadata = {
              contentType: "image",
            };

            await uploadBytes(storageRef, readFile, metadata);
            firebaseFileURL = await getDownloadURL(storageRef);

            req.newImageName = newImageName;
            req.firebaseFileURL = firebaseFileURL;

            if (firebaseFileURL) {
              next();
            }
          }
        );
      }
    );
  } else {
    next();
  }
};

module.exports = saveImages;
