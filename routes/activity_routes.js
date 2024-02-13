const activityController = require('../controller/activity_controller');
const express = require('express');
const checkAuth = require('../middleware/mideleware');

const route = express.Router();

route.post('/add-activity', checkAuth.checkAuth, activityController.addActivity);
route.put('/update-activity', checkAuth.checkAuth, activityController.updateActivity);
route.put('/get-all-activities',checkAuth.checkAuth, activityController.getAllActivity);
route.put('/get-single-activity', checkAuth.checkAuth, activityController.getSingleActivity);
route.put('/update-activity-status', checkAuth.checkAuth, activityController.updateActivityStatus);

module.exports = route;