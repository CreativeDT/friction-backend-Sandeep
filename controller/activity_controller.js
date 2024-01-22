const activityModel = require("./../model/activity_model");
const serviceTechModel = require("./../model/service_tech_model");
const railUnitLocationModel = require("./../model/rail_unit_location_model");
const activityTypeModel = require("./../model/activity_type_model");
const activityStatusModel = require("./../model/activity_status_model");
const userModel = require("./../model/user_model");
const { Op } = require("sequelize");

function addActivity(req, res) {
  activityModel.beforeCreate(async (activities, options) => {
    const activityCount = await activityModel.count();
    const startingNumber = 10000;
    const activitySerialNumber = `${String(
      startingNumber + activityCount,
    ).padStart(5, "0")}`;
    activities.ActivityTypeSerialId = activitySerialNumber;
  });
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
    ServiceTechId: req.body.serviceTechId,
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
    ServiceTechId: req.body.serviceTechId,
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
  // Paginination
  const page =
    parseInt(req.body.pageNumber) || parseInt(process.env.DEFAULT_PAGE_NUMBER);
  const limit =
    parseInt(req.body.limit) || parseInt(process.env.DEFAULT_PAGE_LENGTH);
  const offset = (page - 1) * limit;
  // Filter Records
  const {
    filterActivityTypeId,
    filterServiceTechId,
    filterActualWorkStartDate,
    filterActualWorkEndDate,
    filterRailLine,
    filterMilePost,
    filterDivision,
    filterSubDivision,
  } = req.body;

  const whereClause = {
    IsActive: true,
  };

  if (filterActivityTypeId) {
    whereClause.ActivityTypeId = filterActivityTypeId;
  }

  if (filterServiceTechId) {
    whereClause.ServiceTechId = filterServiceTechId;
  }

  if (filterActualWorkStartDate && filterActualWorkEndDate) {
    whereClause.ActualWorkStartDate = {
      [Op.between]: [filterActualWorkStartDate, filterActualWorkEndDate],
    };
  }

  if (filterRailLine) {
    whereClause["$RailUnitLocation.RailRoad$"] = filterRailLine;
  }

  if (filterMilePost) {
    whereClause["$RailUnitLocation.MilePost$"] = filterMilePost;
  }

  if (filterDivision) {
    whereClause["$RailUnitLocation.Division$"] = filterDivision;
  }

  if (filterSubDivision) {
    whereClause["$RailUnitLocation.SubDivision$"] = filterSubDivision;
  }

  activityModel
    .findAndCountAll({
      limit,
      offset,
      where: whereClause,
      include: [
        {
          model: serviceTechModel,
          attributes: ["ServiceTechEmail"],
        },
        {
          model: railUnitLocationModel,
          attributes: ["RailRoad", "Division", "SubDivision", "MilePost"],
        },
        {
          model: activityTypeModel,
          attributes: ["ActivityName"],
        },
        {
          model: activityStatusModel,
          attributes: ["Name"],
        },
        {
          model: userModel,
          attributes: ["Email"],
        },
      ],
      attributes: {
        exclude: ["CreatedAt", "UpdatedAt", "IsActive"],
      },
    })
    .then((result) => {
      res.status(200).json({
        [process.env.PROJECT_NAME]: {
          status: 200,
          timestamp: Date.now(),
          message: "Activity Fetched",
          totalCount: result.count,
          data: result.rows.map((activity) => {
            return {
              ActivityId: activity.ActivityId,
              ActivityTypeSerialId: activity.ActivityTypeSerialId,
              EstimatedWorkStartDate: activity.EstimatedWorkStartDate,
              EstimatedWorkEndDate: activity.EstimatedWorkEndDate,
              ActualWorkStartDate: activity.ActualWorkStartDate,
              ActualWorkEndDate: activity.ActualWorkEndDate,
              ActualWorkStartLat: activity.ActualWorkStartLat,
              ActualWorkStartLong: activity.ActualWorkStartLong,
              ActualWorkEndLat: activity.ActualWorkEndLat,
              ActualWorkEndLong: activity.ActualWorkEndLong,
              TruckId: activity.truckId,
              MileageStart: activity.MileageStart,
              MileageEnd: activity.MileageEnd,
              ServiceTechEmail: activity.ServiceTechId
                ? activity.ServiceTech.ServiceTechEmail
                : null,
              RailLocation: activity.RailUnitLocationId
                ? activity.RailUnitLocation.RailRoad
                : null,
              ActivityType: activity.ActivityTypeId
                ? activity.ActivityType.ActivityName
                : null,
              ActivityStatus: activity.ActivityStatusId
                ? activity.ActivityStatus.Name
                : null,
              CreatedBy: activity.CreatedBy ? activity.User.Email : null,
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

function getSingleActivity(req, res) {
  activityModel
    .findOne({
      where: { ActivityId: req.body.activityId },
      include: [
        {
          model: serviceTechModel,
          attributes: ["ServiceTechEmail"],
        },
        {
          model: railUnitLocationModel,
          attributes: ["RailRoad"],
        },
        {
          model: activityTypeModel,
          attributes: ["ActivityName"],
        },
        {
          model: activityStatusModel,
          attributes: ["Name"],
        },
        {
          model: userModel,
          attributes: ["Email"],
        },
      ],
    })
    .then((activity) => {
      if (activity === null) {
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
            data: {
              ActivityId: activity.ActivityId,
              ActivityTypeSerialId: activity.ActivityTypeSerialId,
              EstimatedWorkStartDate: activity.EstimatedWorkStartDate,
              EstimatedWorkEndDate: activity.EstimatedWorkEndDate,
              ActualWorkStartDate: activity.ActualWorkStartDate,
              ActualWorkEndDate: activity.ActualWorkEndDate,
              ActualWorkStartLat: activity.ActualWorkStartLat,
              ActualWorkStartLong: activity.ActualWorkStartLong,
              ActualWorkEndLat: activity.ActualWorkEndLat,
              ActualWorkEndLong: activity.ActualWorkEndLong,
              TruckId: activity.truckId,
              MileageStart: activity.MileageStart,
              MileageEnd: activity.MileageEnd,
              ServiceTechEmail: activity.ServiceTechId
                ? activity.ServiceTech.ServiceTechEmail
                : null,
              RailLocation: activity.RailUnitLocationId
                ? activity.RailUnitLocation.RailRoad
                : null,
              ActivityType: activity.ActivityTypeId
                ? activity.ActivityType.ActivityName
                : null,
              ActivityStatus: activity.ActivityStatusId
                ? activity.ActivityStatus.Name
                : null,
              CreatedBy: activity.CreatedBy ? activity.User.Email : null,
            },
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
