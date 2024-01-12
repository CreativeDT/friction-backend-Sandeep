const historyController = require('../controller/history_controller');
const express = require('express');
const checkAuth = require('../middleware/mideleware');

const route = express.Router();

route.post('/add-history', checkAuth.checkAuth, historyController.addHistory);
route.put('/update-history', checkAuth.checkAuth, historyController.updateHistory);
route.put('/get-user-history',checkAuth.checkAuth, historyController.getHistorysOfSepecificUser);

module.exports = route;