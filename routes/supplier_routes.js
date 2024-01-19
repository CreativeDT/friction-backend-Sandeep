const supplierController = require('../controller/supplier_controller');
const express = require('express');
const checkAuth = require('../middleware/mideleware');

const route = express.Router();

route.post('/add-supplier', checkAuth.checkAuth, supplierController.addSupplier);
route.put('/update-supplier', checkAuth.checkAuth, supplierController.updateSupplier);
route.get('/get-all-supplier',checkAuth.checkAuth, supplierController.getAllSupplier);

module.exports = route;