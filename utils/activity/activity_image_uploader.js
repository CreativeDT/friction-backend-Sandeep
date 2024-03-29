const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    const activitySerial = req.body.activitySerialId;
    const uploadPath = `uploads/activity-images/${activitySerial}`;
    fs.mkdirSync(uploadPath, { recursive: true });
    callback(null, uploadPath);
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, callback) => {
  if (
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/png"
  ) {
    callback(null, true);
  } else {
    callback(new Error("Unsupported file format"), false);
  }
};

const upload = multer({
  storage: storage,
  onFileUploadStart: fileFilter,
  limits: {
    fileSize: 2048 * 2048 * 5,
  },
}).single("imageUrl");

module.exports = {
  upload: upload,
};
