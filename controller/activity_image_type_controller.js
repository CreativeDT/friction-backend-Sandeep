const activityImageTypeModel = require("../model/activity_image_type_model");

function addActivityImageType(req, res) {
  const activityImageType = {
    ActivityTypeName: req.body.activityTypeName,
    IsActive: true,
  };
  activityImageTypeModel
    .create(activityImageType)
    .then((result) => {
      res.status(201).json({
        [process.env.PROJECT_NAME]: {
          status: 201,
          timestamp: Date.now(),
          message: "Activity Image Type Created",
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

function updateActivityImageType(req, res) {
  const activityImageType = {
    ActivityTypeName: req.body.activityTypeName,
    IsActive: true,
  };
  activityImageTypeModel
    .findOne({ where: { ActivityImageTypeId: req.body.activityImageTypeId } })
    .then((activityImageTypeResult) => {
      if (activityImageTypeResult === null) {
        res.status(404).json({
          [process.env.PROJECT_NAME]: {
            status: 404,
            timestamp: Date.now(),
            message: `Activity status with ${req.body.activityImageTypeId} not found!`,
          },
        });
      } else {
        activityImageTypeModel
          .update(activityImageType, {
            where: { ActivityImageTypeId: req.body.activityImageTypeId },
          })
          .then((result) => {
            if (result) {
              res.status(200).json({
                [process.env.PROJECT_NAME]: {
                  status: 200,
                  timestamp: Date.now(),
                  message: "Activity Image Type Updated",
                  data: result,
                },
              });
            } else {
              res.status(500).json({
                [process.env.PROJECT_NAME]: {
                  status: 500,
                  timestamp: Date.now(),
                  message: "Unable to update the ActivityImageType",
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

function getAllActivityImageTypes(req, res) {
  activityImageTypeModel
    .findAll({
      where: { IsActive: true },
      attributes: { exclude: ["CreatedAt", "UpdatedAt", "IsActive"] },
    })
    .then((result) => {
      if (result) {
        res.status(200).json({
          [process.env.PROJECT_NAME]: {
            status: 200,
            timestamp: Date.now(),
            message: "Fetched All Activity Image Type",
            data: result,
          },
        });
      } else {
        res.status(500).json({
          [process.env.PROJECT_NAME]: {
            status: 500,
            timestamp: Date.now(),
            message: "Unable to fetch Activity Image Types",
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
  addActivityImageType: addActivityImageType,
  updateActivityImageType: updateActivityImageType,
  getAllActivityImageTypes: getAllActivityImageTypes,
};
