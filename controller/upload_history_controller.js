const uploadHistoryModel = require("../model/upload_history_model");
const activityModel = require("../model/activity_model");
const serviceTechModel = require("../model/service_tech_model");
const uploadTypeModel = require("../model/upload_type_model");

function addUploadHistory(req, res) {
  const uploadHistory = {
    UploadedDateTime: req.body.uploadedDateTime,
    ActivityId: req.body.activityId,
    UploadTypeId: req.body.uploadTypeId,
    IsActive: true,
    Status: true,
  };
  uploadHistoryModel
    .create(uploadHistory)
    .then((result) => {
      res.status(201).json({
        [process.env.PROJECT_NAME]: {
          status: 201,
          timestamp: Date.now(),
          message: "Upload History Created",
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

function updateUploadHistory(req, res) {
  const uploadHistory = {
    UploadedDateTime: req.body.uploadedDateTime,
    ActivityId: req.body.activityId,
    UploadTypeId: req.body.uploadTypeId,
    IsActive: true,
    Status: true,
  };
  uploadHistoryModel
    .findOne({ where: { UploadHistoryId: req.body.uploadHistoryId } })
    .then((uploadHistoryResult) => {
      if (uploadHistoryResult === null) {
        res.status(404).json({
          [process.env.PROJECT_NAME]: {
            status: 404,
            timestamp: Date.now(),
            message: `Activity status with ${req.body.uploadHistoryId} not found!`,
          },
        });
      } else {
        uploadHistoryModel
          .update(uploadHistory, {
            where: { UploadHistoryId: req.body.uploadHistoryId },
          })
          .then((result) => {
            if (result) {
              res.status(200).json({
                [process.env.PROJECT_NAME]: {
                  status: 200,
                  timestamp: Date.now(),
                  message: "Upload History Updated",
                  data: uploadHistory,
                },
              });
            } else {
              res.status(500).json({
                [process.env.PROJECT_NAME]: {
                  status: 500,
                  timestamp: Date.now(),
                  message: "Unable to update the UploadHistoryType",
                },
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
    });
}

function getAllUploadHistory(req, res) {
  uploadHistoryModel
    .findAll({
      where: { IsActive: true },
      include: [
        {
          model: activityModel,
          attributes: ["ActivityTypeSerialId"],
          include: [
            {
              model: serviceTechModel,
              attributes: ["ServiceTechEmail"],
            },
          ],
        },
        {
          model: uploadTypeModel,
          attributes: ["UploadTypeName"],
        },
      ],
      attributes: { exclude: ["CreatedAt", "UpdatedAt", "IsActive"] },
    })
    .then((result) => {
      if (result) {
        res.status(200).json({
          [process.env.PROJECT_NAME]: {
            status: 200,
            timestamp: Date.now(),
            message: "Fetched All Upload History",
            data: result.map((uploadHistory) => {
              return {
                UploadHistoryId: uploadHistory.UploadHistoryId,
                UploadedDateTime: uploadHistory.UploadedDateTime,
                ActivitySerialId: uploadHistory.Activity.ActivityTypeSerialId,
                ServiceTechEmail:
                  uploadHistory.Activity.ServiceTech.ServiceTechEmail,
                UploadType: uploadHistory.UploadType.UploadTypeName,
                Status: uploadHistory.Status,
              };
            }),
          },
        });
      } else {
        res.status(500).json({
          [process.env.PROJECT_NAME]: {
            status: 500,
            timestamp: Date.now(),
            message: "Unable to fetch Upload History",
          },
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

module.exports = {
  addUploadHistory: addUploadHistory,
  updateUploadHistory: updateUploadHistory,
  getAllUploadHistory: getAllUploadHistory,
};
