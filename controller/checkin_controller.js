const checkInModel = require("./../model/checkin_model");

function addCheckIn(req, res) {
  const checkIn = {
    StartDateTime: req.body.startDateTime,
    EndDateTime: req.body.endDateTime,
    ActivityId: req.body.activityId,
    UserId: req.body.userId,
    IsActive: true,
  };
  checkInModel
    .create(checkIn)
    .then((result) => {
      res.status(201).json({
        [process.env.PROJECT_NAME]: {
          status: 201,
          timestamp: Date.now(),
          message: "CheckIn Created",
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

function updateCheckIn(req, res) {
  const checkIn = {
    StartDateTime: req.body.startDateTime,
    EndDateTime: req.body.endDateTime,
    ActivityId: req.body.activityId,
    UserId: req.body.userId,
    IsActive: true,
  };
  checkInModel
    .findOne({ where: { CheckInId: req.body.checkInId } })
    .then((result) => {
      if (result === null) {
        res.status(404).json({
          [process.env.PROJECT_NAME]: {
            status: 404,
            timestamp: Date.now(),
            message: `CheckIn with ${req.body.checkInId} not found`,
          },
        });
      } else {
        checkInModel
          .update(checkIn, { where: { CheckInId: req.body.activityId } })
          .then((result) => {
            res.status(200).json({
              [process.env.PROJECT_NAME]: {
                status: 200,
                timestamp: Date.now(),
                message: "CheckIn Updated",
                data: checkIn,
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

function getCheckInsOfSepecificUser(req, res) {
  checkInModel
    .findAll({
      where: { UserId: req.body.userId },
      attributes: { exclude: ["CreatedAt", "UpdatedAt", "IsActive"] },
    })
    .then((result) => {
      if (result === null) {
        res.status(404).json({
          [process.env.PROJECT_NAME]: {
            status: 404,
            timestamp: Date.now(),
            message: `CheckIns for user ${req.body.userId} not found`,
          },
        });
      } else {
        res.status(200).json({
          [process.env.PROJECT_NAME]: {
            status: 200,
            timestamp: Date.now(),
            message: "CheckIn Updated",
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
  addCheckIn: addCheckIn,
  updateCheckIn: updateCheckIn,
  getCheckInsOfSepecificUser: getCheckInsOfSepecificUser,
};
