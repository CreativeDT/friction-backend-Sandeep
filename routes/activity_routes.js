const activityController = require('../controller/activity_controller');
const express = require('express');
const checkAuth = require('../middleware/mideleware');

const route = express.Router();

route.post('/add-activity', checkAuth.checkAuth, activityController.addActivity);
route.put('/update-activity', checkAuth.checkAuth, activityController.updateActivity);
route.put('/get-all-activity',checkAuth.checkAuth, activityController.getAllActivity);
route.put('/get-single-activity', checkAuth.checkAuth, activityController.getSingleActivity);

module.exports = route;