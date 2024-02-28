const adminDocuments = require("../../controller/ace/admin_document_controller");
const express = require("express");
const checkAuth = require("../../middleware/mideleware");

const route = express.Router();

route.put("/get-all-documents", adminDocuments.findAll);
route.post("/add-document", adminDocuments.create);
route.post("/update-document", adminDocuments.update);
route.delete("/delete-document", adminDocuments.delete);

module.exports = route;
