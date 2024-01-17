const activityImageController = require("../controller/activity_image_controller");
const express = require("express");
const checkAuth = require("../middleware/mideleware");
const upload = require("../utils/activity/activity_image_uploader");

const route = express.Router();

route.patch("/add-activity-image", checkAuth.checkAuth, upload.upload, activityImageController.addActivityImage);
route.patch("/update-activity-image", checkAuth.checkAuth, upload.upload, activityImageController.updateActivityImage);
route.get("/get-all-activity-images", checkAuth.checkAuth, activityImageController.getAllActivityImages);

module.exports = route;
