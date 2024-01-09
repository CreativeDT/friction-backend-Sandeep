const activityTypeModel = require("../model/activity_type_model");

function addActivityType(req, res) {
  const activityType = {
    ActivityName: req.body.activityName,
    IsActive: req.body.isActive
  };
  activityTypeModel
    .create(activityType)
    .then((result) => {
      if (result) {
        res.status(201).json({
          [process.env.PROJECT_NAME]: {
            status: 201,
            timestamp: Date.now(),
            message: "ActivityType Created",
            data: result
          },
        });
      } else {
        res.status(500).json({
          [process.env.PROJECT_NAME]: {
            status: 500,
            timestamp: Date.now(),
            message: "Unable to create ActivityType",
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
          data: error
        },
      });
    });
}

function updateActivityType(req, res) {
  const activityType = {
    ActivityTypeId: req.body.activityTypeId,
    ActivityName: req.body.activityName,
    IsActive: req.body.isActive
  };
  activityTypeModel
    .findOne({ where: { ActivityTypeId: req.body.activityTypeId } })
    .then((activityTypeResult) => {
      if (activityTypeResult === null) {
        res.status(404).json({
          [process.env.PROJECT_NAME]: {
            status: 404,
            timestamp: Date.now(),
            message: "User with this email not found!",
            data: {
              email: user.email
            },
          },
        });
      } else {
        activityTypeModel
          .update(activityType, { where: { ActivityTypeId: req.body.activityTypeId } })
          .then((result) => {
            if (result) {
              res.status(200).json({
                [process.env.PROJECT_NAME]: {
                  status: 200,
                  timestamp: Date.now(),
                  message: "ActivityType Updated",
                  data: result
                },
              });
            } else {
              res.status(500).json({
                [process.env.PROJECT_NAME]: {
                  status: 500,
                  timestamp: Date.now(),
                  message: "Unable to update the ActivityType",
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
                data: error
              },
            });
          });
      }
    });
}

function getAllActivityTypes(req, res) {
  activityTypeModel
    .findAll({
      where: {IsActive: true},
      attributes: { exclude: ["CreatedAt", "UpdatedAt", "IsActive"] },
    })
    .then((result) => {
      if (result) {
        res.status(200).json({
          [process.env.PROJECT_NAME]: {
            status: 200,
            timestamp: Date.now(),
            message: "Fetched All ActivityType",
            data: result
          },
        });
      } else {
        res.status(500).json({
          [process.env.PROJECT_NAME]: {
            status: 500,
            timestamp: Date.now(),
            message: "Unable to fetch ActivityTypes",
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
          data: error
        },
      });
    });
}

module.exports = {
  addActivityType: addActivityType,
  updateActivityType: updateActivityType,
  getAllActivityTypes: getAllActivityTypes,
};
