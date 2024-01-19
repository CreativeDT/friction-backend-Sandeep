const supplierModel = require("../model/supplier_model");

function addSupplier(req, res) {
  const supplier = {
    SupplierName: req.body.supplierName,
    IsActive: true,
  };
  supplierModel
    .create(supplier)
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

function updateSupplier(req, res) {
  const supplier = {
    SupplierName: req.body.supplierName,
    IsActive: true,
  };
  supplierModel
    .findOne({ where: { SuppliersId: req.body.supplierId } })
    .then((SupplierResult) => {
      if (SupplierResult === null) {
        res.status(404).json({
          [process.env.PROJECT_NAME]: {
            status: 404,
            timestamp: Date.now(),
            message: `Supplier s with ${req.body.supplierId} not found`,
          },
        });
      } else {
        supplierModel
          .update(supplier, {
            where: { SuppliersId: req.body.supplierId },
          })
          .then((result) => {
            res.status(200).json({
              [process.env.PROJECT_NAME]: {
                status: 200,
                timestamp: Date.now(),
                message: "Supplier Updated",
                data: supplier,
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

function getAllSupplier(req, res) {
  supplierModel
    .findAll({
      where: { IsActive: true },
      attributes: { exclude: ["CreatedAt", "UpdatedAt", "IsActive"] },
    })
    .then((result) => {
      res.status(200).json({
        [process.env.PROJECT_NAME]: {
          status: 200,
          timestamp: Date.now(),
          message: "Supplier Fetched",
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
  addSupplier: addSupplier,
  updateSupplier: updateSupplier,
  getAllSupplier: getAllSupplier,
};
