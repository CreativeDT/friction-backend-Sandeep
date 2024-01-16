const activityModel = require("./../model/activity_model");

function addActivity(req, res) {
  const activity = {
    EstimatedWorkStartDate: req.body.estimatedWorkStartDate,
    EstimatedWorkEndDate: req.body.estimatedWorkEndDate,
    ActualWorkStartDate: req.body.actualWorkStartDate,
    ActualWorkEndDate: req.body.actualWorkEndDate,
    IsAmended: req.body.isAmended,
    ActualWorkStartLat: req.body.actualWorkStartLat,
    ActualWorkStartLong: req.body.actualWorkStartLong,
    ActualWorkEndLat: req.body.actualEndWorkLat,
    ActualWorkEndLong: req.body.actualWorkEndLong,
    TruckId: req.body.truckId,
    MileageStart: req.body.mileageStart,
    MileageEnd: req.body.mileageEnd,
    SeriviceTechId: req.body.seriviceTechId,
    RailUnitLocationId: req.body.railUnitLocationId,
    ActivityTypeId: req.body.activityTypeId,
    ActivityStatusId: req.body.activityStatusId,
    CreatedBy: req.body.createdById,
    IsActive: true,
  };
  activityModel
    .create(activity)
    .then((result) => {
      res.status(201).json({
        [process.env.PROJECT_NAME]: {
          status: 201,
          timestamp: Date.now(),
          message: "Activity Created",
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

function updateActivity(req, res) {
  const activity = {
    EstimatedWorkStartDate: req.body.estimatedWorkStartDate,
    EstimatedWorkEndDate: req.body.estimatedWorkEndDate,
    ActualWorkStartDate: req.body.actualWorkStartDate,
    ActualWorkEndDate: req.body.actualWorkEndDate,
    IsAmended: req.body.isAmended,
    ActualWorkStartLat: req.body.actualWorkStartLat,
    ActualWorkStartLong: req.body.actualWorkStartLong,
    ActualWorkEndLat: req.body.actualEndWorkLat,
    ActualWorkEndLong: req.body.actualWorkEndLong,
    TruckId: req.body.truckId,
    MileageStart: req.body.mileageStart,
    MileageEnd: req.body.mileageEnd,
    SeriviceTechId: req.body.seriviceTechId,
    RailUnitLocationId: req.body.railUnitLocationId,
    ActivityTypeId: req.body.activityTypeId,
    ActivityStatusId: req.body.activityStatusId,
    CreatedBy: req.body.createdById,
    IsActive: true,
  };
  activityModel
    .findOne({ where: { ActivityId: req.body.activityId } })
    .then((activityResult) => {
      if (activityResult === null) {
        res.status(404).json({
          [process.env.PROJECT_NAME]: {
            status: 404,
            timestamp: Date.now(),
            message: `Activity with ${req.body.activityId} not found!`,
          },
        });
      } else {
        activityModel
          .update(activity, {
            where: { ActivityId: activityResult.ActivityId },
          })
          .then((result) => {
            res.status(200).json({
              [process.env.PROJECT_NAME]: {
                status: 200,
                timestamp: Date.now(),
                message: "Activity Updated",
                data: activity,
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

function getAllActivity(req, res) {
  const page = parseInt(req.body.pageNumber) || 1;
  const limit = parseInt(req.body.limit) || 10;
  const offset = (page - 1) * limit;
  activityModel
    .findAll({
      limit,
      offset,
      where: { IsActive: true },
      attributes: { exclude: ["CreatedAt", "UpdatedAt", "IsActive"] },
    })
    .then((result) => {
      res.status(200).json({
        [process.env.PROJECT_NAME]: {
          status: 200,
          timestamp: Date.now(),
          message: "Activity Fetched",
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

function getSingleActivity(req, res) {
  activityModel
    .findOne({ where: { ActivityId: req.body.activityId } })
    .then((activityResult) => {
      if (activityResult === null) {
        res.status(404).json({
          [process.env.PROJECT_NAME]: {
            status: 404,
            timestamp: Date.now(),
            message: `Activity with ${req.body.activityId} not found!`,
          },
        });
      } else {
        res.status(200).json({
          [process.env.PROJECT_NAME]: {
            status: 200,
            timestamp: Date.now(),
            message: "Loaded Activity",
            data: activityResult,
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
  addActivity: addActivity,
  updateActivity: updateActivity,
  getAllActivity: getAllActivity,
  getSingleActivity: getSingleActivity,
};
