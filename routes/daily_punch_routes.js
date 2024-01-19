const dailyPunchController = require('../controller/daily_punch_controller');
const express = require('express');
const checkAuth = require('../middleware/mideleware');

const route = express.Router();

route.post('/add-daily-punch', checkAuth.checkAuth, dailyPunchController.addDailyPunch);
route.put('/update-daily-punch', checkAuth.checkAuth, dailyPunchController.updateDailyPunch);
route.put('/get-daily-punch-of-user', checkAuth.checkAuth, dailyPunchController.getAllDailyPunchesOfUser);

module.exports = route;