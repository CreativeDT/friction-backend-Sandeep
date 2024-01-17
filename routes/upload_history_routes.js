const uploadHistoryController = require('../controller/upload_history_controller');
const express = require('express');
const checkAuth = require('../middleware/mideleware');

const route = express.Router();

route.post('/add-upload-history', checkAuth.checkAuth, uploadHistoryController.addUploadHistory);
route.put('/update-upload-history', checkAuth.checkAuth, uploadHistoryController.updateUploadHistory);
route.get('/get-all-upload-history',checkAuth.checkAuth, uploadHistoryController.getAllUploadHistory);

module.exports = route;