const serviceTechController = require('../controller/service_tech_controller');
const express = require('express');
const checkAuth = require('../middleware/mideleware');

const route = express.Router();

route.post('/add-serviceTech', checkAuth.checkAuth, serviceTechController.addServiceTech);
route.put('/update-serviceTech', checkAuth.checkAuth, serviceTechController.updateServiceTech);
route.get('/get-all-serviceTechs', checkAuth.checkAuth, serviceTechController.getAllServiceTechs);

module.exports = route;