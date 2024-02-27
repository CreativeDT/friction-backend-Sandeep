const documentController = require("../../controller/ace/document_controller");
const express = require("express");
const checkAuth = require("../../middleware/mideleware");

const route = express.Router();

route.post("/add-document-record", checkAuth.checkAuth, documentController.addDocument);
route.post("/update-document-record", checkAuth.checkAuth, documentController.updateDocument);
route.get("/get-all-documents", checkAuth.checkAuth, documentController.getAllDocuments);

module.exports = route;