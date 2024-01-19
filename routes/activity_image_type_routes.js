const activityImageTypeController = require('../controller/activity_image_type_controller');
const express = require('express');
const checkAuth = require('../middleware/mideleware');

const route = express.Router();

route.post('/add-activity-image-type', checkAuth.checkAuth, activityImageTypeController.addActivityImageType);
route.put('/update-activity-image-type', checkAuth.checkAuth, activityImageTypeController.updateActivityImageType);
route.get('/get-all-activity-image-types',checkAuth.checkAuth, activityImageTypeController.getAllActivityImageTypes);

module.exports = route;