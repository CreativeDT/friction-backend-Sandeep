const uploadTypeController = require('../controller/upload_types_controller');
const express = require('express');
const checkAuth = require('../middleware/mideleware');

const route = express.Router();

route.post('/add-upload-type', checkAuth.checkAuth, uploadTypeController.addUploadType);
route.put('/update-upload-type', checkAuth.checkAuth, uploadTypeController.updateUploadTypes);
route.get('/get-all-upload-types',checkAuth.checkAuth, uploadTypeController.getAllUploadTypes);

module.exports = route;