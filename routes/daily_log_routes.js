const dailyLogController = require('../controller/daily_log_controller');
const express = require('express');
const checkAuth = require('../middleware/mideleware');

const route = express.Router();

route.post('/add-daily-log', checkAuth.checkAuth, dailyLogController.addDailyLog);
route.put('/update-daily-log', checkAuth.checkAuth, dailyLogController.updateDailyLog);
route.put('/get-activity-daily-log',checkAuth.checkAuth, dailyLogController.getDailyLogsOfSepecificActivity);

module.exports = route;