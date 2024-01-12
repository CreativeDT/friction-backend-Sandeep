const dailyLogModel = require("./../model/daily_log_model");

function addDailyLog(req, res) {
  const dailyLog = {
    UploadedDateTime: req.body.uploadDateTime,
    IsSuccess: true,
    ActivityId: req.body.activityId,
    IsActive: true,
  };
  dailyLogModel
    .create(dailyLog)
    .then((result) => {
      res.status(201).json({
        [process.env.PROJECT_NAME]: {
          status: 201,
          timestamp: Date.now(),
          message: "DailyLog Created",
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

function updateDailyLog(req, res) {
  const dailyLog = {
    UploadedDateTime: req.body.uploadDateTime,
    IsSuccess: true,
    ActivityId: req.body.activityId,
    IsActive: true,
  };
  dailyLogModel
    .findOne({ where: { DailyLogId: req.body.dailyLogId } })
    .then((result) => {
      if (result === null) {
        res.status(404).json({
          [process.env.PROJECT_NAME]: {
            status: 404,
            timestamp: Date.now(),
            message: `DailyLog with ${req.body.dailyLogId} not found`,
          },
        });
      } else {
        dailyLogModel
          .update(dailyLog, { where: { DailyLogId: req.body.dailyLogId } })
          .then((result) => {
            res.status(200).json({
              [process.env.PROJECT_NAME]: {
                status: 200,
                timestamp: Date.now(),
                message: "DailyLog Updated",
                data: dailyLog,
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

function getDailyLogsOfSepecificActivity(req, res) {
  dailyLogModel
    .findAll({
      where: { ActivityId: req.body.activityId },
      attributes: { exclude: ["CreatedAt", "UpdatedAt", "IsActive"] },
    })
    .then((result) => {
      if (result === null) {
        res.status(404).json({
          [process.env.PROJECT_NAME]: {
            status: 404,
            timestamp: Date.now(),
            message: `DailyLogs for user ${req.body.activityId} not found`,
          },
        });
      } else {
        res.status(200).json({
          [process.env.PROJECT_NAME]: {
            status: 200,
            timestamp: Date.now(),
            message: "DailyLog Updated",
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
  addDailyLog: addDailyLog,
  updateDailyLog: updateDailyLog,
  getDailyLogsOfSepecificActivity: getDailyLogsOfSepecificActivity,
};
