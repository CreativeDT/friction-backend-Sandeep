const dailyPunchModel = require("../model/daily_punch_model");

function addDailyPunch(req, res) {
  const dailyPunch = {
    CheckInStatus: req.body.checkInStatus,
    PunchdateTime: req.body.punchDataTime,
    UserId: req.body.userId,
    IsActive: true,
  };
  dailyPunchModel
    .create(dailyPunch)
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

function updateDailyPunch(req, res) {
  const dailyPunch = {
    CheckInStatus: req.body.checkInStatus,
    PunchdateTime: req.body.punchDataTime,
    UserId: req.body.userId,
    IsActive: true,
  };
  dailyPunchModel
    .findOne({ where: { DailyPunchId: req.body.dailyPunchId } })
    .then((DailyPunchResult) => {
      if (DailyPunchResult === null) {
        res.status(404).json({
          [process.env.PROJECT_NAME]: {
            status: 404,
            timestamp: Date.now(),
            message: `DailyPunch s with ${req.body.deailyPunchId} not found`,
          },
        });
      } else {
        dailyPunchModel
          .update(dailyPunch, {
            where: { DailyPunchId: req.body.dailyPunchId },
          })
          .then((result) => {
            res.status(200).json({
              [process.env.PROJECT_NAME]: {
                status: 200,
                timestamp: Date.now(),
                message: "DailyPunch Updated",
                data: dailyPunch,
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

function getAllDailyPunchesOfUser(req, res) {
  dailyPunchModel
    .findAll({
      where: { IsActive: true , UserId: req.body.userId},
      attributes: { exclude: ["CreatedAt", "UpdatedAt", "IsActive"] },
    })
    .then((result) => {
      res.status(200).json({
        [process.env.PROJECT_NAME]: {
          status: 200,
          timestamp: Date.now(),
          message: "DailyPunch Fetched",
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
  addDailyPunch: addDailyPunch,
  updateDailyPunch: updateDailyPunch,
  getAllDailyPunchesOfUser: getAllDailyPunchesOfUser,
};
