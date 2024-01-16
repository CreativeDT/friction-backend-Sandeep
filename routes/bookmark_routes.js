const bookmarkController = require('../controller/bookmark_controller');
const express = require('express');
const checkAuth = require('../middleware/mideleware');

const route = express.Router();

route.post('/add-bookmark', checkAuth.checkAuth, bookmarkController.addBookmark);
route.put('/update-bookmark', checkAuth.checkAuth, bookmarkController.updateBookmark);
route.put('/get-user-bookmark',checkAuth.checkAuth, bookmarkController.getBookmarksOfSepecificUser);

module.exports = route;