const partsModel = require("../model/parts_model");
const supplierModel = require("../model/supplier_model");

function addParts(req, res) {
  const parts = {
    PartsId: req.body.checkInStatus,
    SupplierPart: req.body.punchDataTime,
    PartNumber: req.body.partNumber,
    Description: req.body.description,
    SupplierId: req.body.supplierId,
    IsActive: true,
  };
  partsModel
    .create(parts)
    .then((result) => {
      res.status(201).json({
        [process.env.PROJECT_NAME]: {
          status: 201,
          timestamp: Date.now(),
          message: "Daily Punch Created",
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

function updateParts(req, res) {
  const parts = {
    PartsId: req.body.checkInStatus,
    SupplierPart: req.body.punchDataTime,
    PartNumber: req.body.partNumber,
    Description: req.body.description,
    SupplierId: req.body.supplierId,
    IsActive: true,
  };
  partsModel
    .findOne({ where: { PartssId: req.body.partsId } })
    .then((PartsResult) => {
      if (PartsResult === null) {
        res.status(404).json({
          [process.env.PROJECT_NAME]: {
            status: 404,
            timestamp: Date.now(),
            message: `Parts s with ${req.body.partsId} not found`,
          },
        });
      } else {
        partsModel
          .update(parts, {
            where: { PartssId: req.body.partsId },
          })
          .then((result) => {
            res.status(200).json({
              [process.env.PROJECT_NAME]: {
                status: 200,
                timestamp: Date.now(),
                message: "Parts Updated",
                data: parts,
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

function getAllParts(req, res) {
  partsModel
    .findAll({
      where: { IsActive: true },
      attributes: { exclude: ["CreatedAt", "UpdatedAt", "IsActive"] },
      include: [
        {
          model: supplierModel,
          attributes: ["SupplierName"],
        },
      ],
    })
    .then((result) => {
      res.status(200).json({
        [process.env.PROJECT_NAME]: {
          status: 200,
          timestamp: Date.now(),
          message: "Parts Fetched",
          data: result.map((parts) => {
            return {
              Id: parts.Id,
              PartsId: parts.PartsId,
              Description: parts.Description,
              PartNumber: parts.PartNumber,
              Supplier: parts.SupplierId ? parts.Supplier.SupplierName : null,
            };
          }),
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
  addParts: addParts,
  updateParts: updateParts,
  getAllParts: getAllParts,
};
