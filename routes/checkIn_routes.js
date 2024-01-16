const checkInController = require('../controller/checkin_controller');
const express = require('express');
const checkAuth = require('../middleware/mideleware');

const route = express.Router();

route.post('/add-check-in', checkAuth.checkAuth, checkInController.addCheckIn);
route.put('/update-check-in', checkAuth.checkAuth, checkInController.updateCheckIn);
route.put('/get-user-check-in',checkAuth.checkAuth, checkInController.getCheckInsOfSepecificUser);

module.exports = route;