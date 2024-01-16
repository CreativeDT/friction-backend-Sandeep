const partsController = require('../controller/parts_controller');
const express = require('express');
const checkAuth = require('../middleware/mideleware');

const route = express.Router();

route.post('/add-parts', checkAuth.checkAuth, partsController.addParts);
route.put('/update-parts', checkAuth.checkAuth, partsController.updateParts);
route.put('/get-all-parts',checkAuth.checkAuth, partsController.getAllParts);

module.exports = route;