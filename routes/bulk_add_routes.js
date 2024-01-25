const express = require('express');
const checkAuth = require('../middleware/mideleware');
const bulkAddController = require("./../controller/bulk_add_controller");

const route = express.Router();

route.post('/activity-status', checkAuth.checkAuth, bulkAddController.addActivityStatus);
route.post('/activity-type', checkAuth.checkAuth, bulkAddController.addActivityType);
route.post('/activity-image-type', checkAuth.checkAuth, bulkAddController.addActivityImageType);
route.post('/service-tech', checkAuth.checkAuth, bulkAddController.addServiceTech);
route.post('/rail-unit-location', checkAuth.checkAuth, bulkAddController.addRailUnitLocations);
route.post('/supplier', checkAuth.checkAuth, bulkAddController.addSuppliers);
route.post('/supplier-parts', checkAuth.checkAuth, bulkAddController.addSupplierParts);
route.post('/upload-types', checkAuth.checkAuth, bulkAddController.addUploadTypes);

module.exports = route;