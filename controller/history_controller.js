const historyModel = require("./../model/history_model");

function addHistory(req, res) {
  const history = {
    UploadTypeId: req.body.uploadTypeId,
    UserId: req.body.userId,
    IsSuccess: req.body.isSuccess,
    IsActive: true,
  };
  historyModel
    .create(history)
    .then((result) => {
      res.status(201).json({
        [process.env.PROJECT_NAME]: {
          status: 201,
          timestamp: Date.now(),
          message: "History Created",
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

function updateHistory(req, res) {
  const history = {
    UploadTypeId: req.body.uploadTypeId,
    UserId: req.body.userId,
    IsSuccess: req.body.isSuccess,
    IsActive: true,
  };
  historyModel
    .findOne({ where: { HistoryId: req.body.bookmarkId } })
    .then((result) => {
      if (result === null) {
        res.status(404).json({
          [process.env.PROJECT_NAME]: {
            status: 404,
            timestamp: Date.now(),
            message: `History with ${req.body.bookmarkId} not found`,
          },
        });
      } else {
        historyModel
          .update(history, { where: { HistoryId: req.body.activityId } })
          .then((result) => {
            res.status(200).json({
              [process.env.PROJECT_NAME]: {
                status: 200,
                timestamp: Date.now(),
                message: "History Updated",
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

// function getOneHistory(req, res) {
//     bookmarkModel.findOne({where: {HistoryId: req.body.bookmarkId}}).then(result => {
//         if (result === null) {
//             res.status(404).json({
//                 [process.env.PROJECT_NAME]: {
//                   status: 404,
//                   timestamp: Date.now(),
//                   message: `History with ${req.body.bookmarkId} not found`,
//                 },
//               });
//         }else {
//             res.status(200).json({
//                 [process.env.PROJECT_NAME]: {
//                   status: 200,
//                   timestamp: Date.now(),
//                   message: "History Updated",
//                   data: result,
//                 },
//               });
//         }
//     }).catch(error => {
//         res.status(500).json({
//             [process.env.PROJECT_NAME]: {
//               status: 500,
//               timestamp: Date.now(),
//               message: "Something Went Wrong!",
//               data: error,
//             },
//           });
//     })
// }

function getHistorysOfSepecificUser(req, res) {
  historyModel
    .findAll({ where: { UserId: req.body.userId } })
    .then((result) => {
      if (result === null) {
        res.status(404).json({
          [process.env.PROJECT_NAME]: {
            status: 404,
            timestamp: Date.now(),
            message: `Historys for user ${req.body.userId} not found`,
          },
        });
      } else {
        res.status(200).json({
          [process.env.PROJECT_NAME]: {
            status: 200,
            timestamp: Date.now(),
            message: "History Updated",
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
  addHistory: addHistory,
  updateHistory: updateHistory,
  getHistorysOfSepecificUser: getHistorysOfSepecificUser,
};
