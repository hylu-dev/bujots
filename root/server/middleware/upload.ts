//from https://www.bezkoder.com/node-js-upload-store-images-mongodb/
const util = require("util");
import multer, {} from 'multer';

var storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: { fileSize: 6291456 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  }
});


module.exports = upload;
