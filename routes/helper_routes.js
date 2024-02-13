const helperController = require('../controller/helper_controller');
const express = require('express');
const checkAuth = require('../middleware/mideleware');

const route = express.Router();

route.post('/add-helper', checkAuth.checkAuth, helperController.addHelper);
route.put('/update-helper', checkAuth.checkAuth, helperController.updateHelper);
route.get('/get-all-helpers',checkAuth.checkAuth, helperController.getAllHelpers);
route.put('/get-helper-with-activity', checkAuth.checkAuth, helperController.getSingleForActivity);

module.exports = route;