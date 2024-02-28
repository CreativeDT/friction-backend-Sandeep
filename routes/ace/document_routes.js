const documentController = require("../../controller/ace/document_controller");
const express = require("express");
const checkAuth = require("../../middleware/mideleware");

const route = express.Router();

route.post("/add-document-record", documentController.addDocument);
route.post("/update-document-record", documentController.updateDocument);
route.put("/get-all-documents", documentController.getAllDocuments);

module.exports = route;
