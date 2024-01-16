const uploadTypeModel = require("../model/upload_type_model");

function addUploadType(req, res) {
  const uploadType = {
    UploadTypeName: req.body.uploadTypeName,
    IsActive: true,
  };
  uploadTypeModel
    .create(uploadType)
    .then((result) => {
      res.status(201).json({
        [process.env.PROJECT_NAME]: {
          status: 201,
          timestamp: Date.now(),
          message: "UploadType Created",
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

function updateUploadType(req, res) {
  const uploadType = {
    UploadTypeName: req.body.uploadTypeName,
    IsActive: true,
  };
  uploadTypeModel
    .findOne({ where: { UploadTypeId: req.body.uploadTypeId } })
    .then((uploadTypeResult) => {
      if (uploadTypeResult === null) {
        res.status(404).json({
          [process.env.PROJECT_NAME]: {
            status: 404,
            timestamp: Date.now(),
            message: `UploadType with ${req.body.uploadTypeId} not found`,
          },
        });
      } else {
        uploadTypeModel
          .update(uploadType, {
            where: { UploadTypeId: req.body.uploadTypeId },
          })
          .then((result) => {
            res.status(200).json({
              [process.env.PROJECT_NAME]: {
                status: 200,
                timestamp: Date.now(),
                message: "UploadType Updated",
                data: uploadType,
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

function getAllUploadTypes(req, res) {
  uploadTypeModel
    .findAll({
      where: { IsActive: true },
      attributes: { exclude: ["CreatedAt", "UpdatedAt", "IsActive"] },
    })
    .then((result) => {
      res.status(200).json({
        [process.env.PROJECT_NAME]: {
          status: 200,
          timestamp: Date.now(),
          message: "UploadType s Fetched",
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
  addUploadType: addUploadType,
  updateUploadTypes: updateUploadType,
  getAllUploadTypes: getAllUploadTypes,
};
