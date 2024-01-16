const railLocationController = require('../controller/rail_location_controller');
const express = require('express');
const checkAuth = require('../middleware/mideleware');

const route = express.Router();

route.post('/add-rail-location', checkAuth.checkAuth, railLocationController.addRailLocation);
route.put('/update-rail-location', checkAuth.checkAuth, railLocationController.updateRailLocation);
route.get('/get-all-rail-locations', checkAuth.checkAuth, railLocationController.getAllLocationUnits);

module.exports = route;