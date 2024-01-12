const bookmarkModel = require("./../model/bookmark_model");

function addBookmark(req, res) {
  const bookmark = {
    ActivityId: req.body.activityId,
    UserId: req.body.userId,
    IsBookMarked: req.body.isBookmarked,
    IsActive: true,
  };
  bookmarkModel
    .create(bookmark)
    .then((result) => {
      res.status(201).json({
        [process.env.PROJECT_NAME]: {
          status: 201,
          timestamp: Date.now(),
          message: "Bookmark Created",
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

function updateBookmark(req, res) {
  const bookmark = {
    ActivityId: req.body.activityId,
    UserId: req.body.userId,
    IsBookMarked: req.body.isBookmarked,
    IsActive: true,
  };
  bookmarkModel
    .findOne({ where: { BookmarkId: req.body.bookmarkId } })
    .then((result) => {
      if (result === null) {
        res.status(404).json({
          [process.env.PROJECT_NAME]: {
            status: 404,
            timestamp: Date.now(),
            message: `Bookmark with ${req.body.bookmarkId} not found`,
          },
        });
      } else {
        bookmarkModel
          .update(bookmark, { where: { BookmarkId: req.body.bookmarkId } })
          .then((result) => {
            res.status(200).json({
              [process.env.PROJECT_NAME]: {
                status: 200,
                timestamp: Date.now(),
                message: "Bookmark Updated",
                data: bookmark,
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

// function getOneBookmark(req, res) {
//     bookmarkModel.findOne({where: {BookmarkId: req.body.bookmarkId}}).then(result => {
//         if (result === null) {
//             res.status(404).json({
//                 [process.env.PROJECT_NAME]: {
//                   status: 404,
//                   timestamp: Date.now(),
//                   message: `Bookmark with ${req.body.bookmarkId} not found`,
//                 },
//               });
//         }else {
//             res.status(200).json({
//                 [process.env.PROJECT_NAME]: {
//                   status: 200,
//                   timestamp: Date.now(),
//                   message: "Bookmark Updated",
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

function getBookmarksOfSepecificUser(req, res) {
  bookmarkModel
    .findAll({
      where: { UserId: req.body.userId },
      attributes: { exclude: ["CreatedAt", "UpdatedAt", "IsActive"] },
    })
    .then((result) => {
      if (result === null || result.isEmpty) {
        res.status(404).json({
          [process.env.PROJECT_NAME]: {
            status: 404,
            timestamp: Date.now(),
            message: `Bookmarks for user ${req.body.userId} not found`,
          },
        });
      } else {
        res.status(200).json({
          [process.env.PROJECT_NAME]: {
            status: 200,
            timestamp: Date.now(),
            message: "Bookmark Updated",
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
  addBookmark: addBookmark,
  updateBookmark: updateBookmark,
  getBookmarksOfSepecificUser: getBookmarksOfSepecificUser,
};
