const activityPartsController = require('../controller/activity_parts_controller');
const express = require('express');
const checkAuth = require('../middleware/mideleware');

const route = express.Router();

route.post('/add-activity-part', checkAuth.checkAuth, activityPartsController.addActivityParts);
route.put('/update-activity-part', checkAuth.checkAuth, activityPartsController.updateActivityParts);
route.get('/get-all-activity-parts', checkAuth.checkAuth, activityPartsController.getAllActivityParts);
route.put('/get-single-activity-parts', checkAuth.checkAuth, activityPartsController.getOneActivityPart);

module.exports = route;