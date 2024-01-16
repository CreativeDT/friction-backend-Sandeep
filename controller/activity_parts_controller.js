const activityPartsModel = require("../model/activity_parts_model");

function addActivityParts(req, res) {
  const activityParts = {
    PartId: req.body.partId,
    ActivityId: req.body.activityId,
    IsActive: true,
  };
  activityPartsModel
    .create(activityParts)
    .then((result) => {
      res.status(201).json({
        [process.env.PROJECT_NAME]: {
          status: 201,
          timestamp: Date.now(),
          message: "Activity Parts Created",
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

function updateActivityParts(req, res) {
  const activityParts = {
    PartId: req.body.partId,
    ActivityId: req.body.activityId,
    IsActive: true,
  };
  activityPartsModel
    .findOne({ where: { ActivityPartsId: req.body.activityPartsId } })
    .then((activityPartResult) => {
      if (activityPartResult === null) {
        res.status(404).json({
          [process.env.PROJECT_NAME]: {
            status: 404,
            timestamp: Date.now(),
            message: `Activity Parts with ${req.body.activityPartsId} not found`,
          },
        });
      } else {
        activityPartsModel
          .update(activityParts, {
            where: { ActivityPartsId: req.body.activityPartsId },
          })
          .then((result) => {
            res.status(200).json({
              [process.env.PROJECT_NAME]: {
                status: 200,
                timestamp: Date.now(),
                message: "Activity Parts Created",
                data: activityParts,
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

function getAllActivityParts(req, res) {
  activityPartsModel
    .findAll({
      where: { IsActive: true },
      attributes: { exclude: ["CreatedAt", "UpdatedAt", "IsActive"] },
    })
    .then((result) => {
      res.status(200).json({
        [process.env.PROJECT_NAME]: {
          status: 200,
          timestamp: Date.now(),
          message: "Activity Parts Fetched",
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

function getOneActivityPart(req, res) {
  activityPartsModel
    .findOne({ where: { ActivityPartsId: req.body.activityId } })
    .then((result) => {
      if (result === null) {
        res.status(404).json({
          [process.env.PROJECT_NAME]: {
            status: 404,
            timestamp: Date.now(),
            message: `Activity Parts with ${req.body.activityPartsId} not found`,
          },
        });
      } else {
        res.status(200).json({
          [process.env.PROJECT_NAME]: {
            status: 200,
            timestamp: Date.now(),
            message: "Activity Parts Fetched",
            data: result,
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
  addActivityParts: addActivityParts,
  updateActivityParts: updateActivityParts,
  getAllActivityParts: getAllActivityParts,
  getOneActivityPart: getOneActivityPart,
};
