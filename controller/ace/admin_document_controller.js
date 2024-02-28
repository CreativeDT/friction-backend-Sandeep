const AdministratorDocument = require("../../model/ace/admin_document_model");
const Administrator = require("../../model/ace/administrator_model");
const Documents = require("../../model/ace/documents_model");

const adminDocumentModel = {
  findAll: async (req, res) => {
    const { email } = req.body;

    try {
      const admin = await Administrator.findOne({
        where: { Email: email },
        include: Documents,
      });

      if (!admin) {
        return res.status(404).json({
          [process.env.PROJECT_NAME]: {
            status: 404,
            timestamp: Date.now(),
            message: "Administrator not found",
            data: null,
          },
        });
      }

      const documents = admin.Documents;

      res.status(200).json({
        [process.env.PROJECT_NAME]: {
          status: 200,
          timestamp: Date.now(),
          message: "Fetching all documents for the administrator",
          data: documents,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        [process.env.PROJECT_NAME]: {
          status: 500,
          timestamp: Date.now(),
          message: "Something went wrong!",
          data: error,
        },
      });
    }
  },

  create: async (req, res) => {
    const { email, documentName, documentType, documentDescription } = req.body;

    try {
      const admin = await Administrator.findOne({
        where: { Email: email },
      });

      if (!admin) {
        return res.status(404).json({
          [process.env.PROJECT_NAME]: {
            status: 404,
            timestamp: Date.now(),
            message: "Administrator not found",
            data: null,
          },
        });
      }

      const document = await Documents.create({
        DocumentName: documentName,
        DocumentType: documentType,
        DocumentDescription: documentDescription,
      });

      await admin.addDocument(document);

      res.status(201).json({
        [process.env.PROJECT_NAME]: {
          status: 201,
          timestamp: Date.now(),
          message: "Document created and associated with the administrator",
          data: document,
        },
      });
    } catch (error) {
      res.status(500).json({
        [process.env.PROJECT_NAME]: {
          status: 500,
          timestamp: Date.now(),
          message: "Something went wrong!",
          data: error,
        },
      });
    }
  },

  update: async (req, res) => {
    const { adminId, documentId, selfGranted } = req.body;

    try {
      const admin = await Administrator.findByPk(adminId);

      if (!admin) {
        return res.status(404).json({
          [process.env.PROJECT_NAME]: {
            status: 404,
            timestamp: Date.now(),
            message: "Administrator not found",
            data: null,
          },
        });
      }

      const document = await Documents.findByPk(documentId);

      if (!document) {
        return res.status(404).json({
          [process.env.PROJECT_NAME]: {
            status: 404,
            timestamp: Date.now(),
            message: "Document not found",
            data: null,
          },
        });
      }

      // Update the association in the junction table
      await adminDocumentModel.update(
        { selfGranted: selfGranted },
        {
          where: {
            AdministratorUserId: adminId,
            DocumentDocumentId: documentId,
          },
        },
      );

      res.status(200).json({
        [process.env.PROJECT_NAME]: {
          status: 200,
          timestamp: Date.now(),
          message: "Document association updated successfully",
          data: null,
        },
      });
    } catch (error) {
      res.status(500).json({
        [process.env.PROJECT_NAME]: {
          status: 500,
          timestamp: Date.now(),
          message: "Something went wrong!",
          data: error,
        },
      });
    }
  },

  delete: async (req, res) => {
    const { email, documentId } = req.body;

    try {
      const admin = await Administrator.findOne({where: {Email: email}});

      if (!admin) {
        return res.status(404).json({
          [process.env.PROJECT_NAME]: {
            status: 404,
            timestamp: Date.now(),
            message: "Administrator not found",
            data: null,
          },
        });
      }

      const document = await Documents.findByPk(documentId);

      if (!document) {
        return res.status(404).json({
          [process.env.PROJECT_NAME]: {
            status: 404,
            timestamp: Date.now(),
            message: "Document not found",
            data: null,
          },
        });
      }

      // Use the removeDocument method to remove the association
      await admin.removeDocument(document);

      res.status(200).json({
        [process.env.PROJECT_NAME]: {
          status: 200,
          timestamp: Date.now(),
          message: "Document association removed successfully",
          data: null,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        [process.env.PROJECT_NAME]: {
          status: 500,
          timestamp: Date.now(),
          message: "Something went wrong!",
          data: error,
        },
      });
    }
  },
};

module.exports = adminDocumentModel;
