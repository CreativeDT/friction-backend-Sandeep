const documentModel = require("../../model/ace/documents_model");
const adminModel = require("../../model/ace/administrator_model");

function addDocument(req, res) {
  const document = documentModel.create({
    DocumentName: req.body.documentName,
    DocumentType: req.body.documentType,
    DocumentDescription: req.body.documentDescription,
  });
  adminModel
    .create(document, { through: { selfGranted: false } })
    .then((result) => {
      res.status(200).json({
        [process.env.PROJECT_NAME]: {
          status: 200,
          timestamp: Date.now(),
          message: "Docuement Added",
          data: result,
        },
      });
    })
    .catch((error) => {
      res.status(500).json({
        [process.env.PROJECT_NAME]: {
          status: 500,
          timestamp: Date.now(),
          message: "Something Went Wrong!",
          data: error,
        },
      });
    });
}

function updateDocument(req, res) {
  const document = {
    DocumentName: req.body.documentName,
    DocumentType: req.body.documentType,
    DocumentDescription: req.body.documentDescription,
  };
  documentModel
    .findByPk(req.body.documentId)
    .then((docResult) => {
      documentModel
        .update(document, { where: { DocumentId: docResult.DocumentId } })
        .then((result) => {
          res.status(200).json({
            [process.env.PROJECT_NAME]: {
              status: 200,
              timestamp: Date.now(),
              message: "Docuement Added",
              data: result,
            },
          });
        })
        .catch((error) => {
          res.status(500).json({
            [process.env.PROJECT_NAME]: {
              status: 500,
              timestamp: Date.now(),
              message: "Something Went Wrong!",
              data: error,
            },
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        [process.env.PROJECT_NAME]: {
          status: 500,
          timestamp: Date.now(),
          message: "Something Went Wrong!",
          data: error,
        },
      });
    });
}

function getAllDocuments(req, res) {
  documentModel
    .findAll()
    .then((result) => {
      res.status(200).json({
        [process.env.PROJECT_NAME]: {
          status: 200,
          timestamp: Date.now(),
          message: "Fetching All the Documents",
          data: result,
        },
      });
    })
    .catch((error) => {
      res.status(500).json({
        [process.env.PROJECT_NAME]: {
          status: 500,
          timestamp: Date.now(),
          message: "Something Went Wrong!",
          data: error,
        },
      });
    });
}

module.exports = {
  addDocument: addDocument,
  updateDocument: updateDocument,
  getAllDocuments: getAllDocuments,
};
