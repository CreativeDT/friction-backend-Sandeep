const administratorController = require('../../controller/ace/administrator_controller');
const express = require('express');
const checkAuth = require('../../middleware/mideleware');

const route = express.Router();

route.post('/sign-up', administratorController.userSignUp);
route.post('/login', administratorController.userLogin);
route.patch('/update', checkAuth.checkAuth, administratorController.updateProfile);
route.put('/get-user',  checkAuth.checkAuth, administratorController.getUserProfile);
route.get('/get-all-users', checkAuth.checkAuth, administratorController.getAllTheUsers);

module.exports = route;