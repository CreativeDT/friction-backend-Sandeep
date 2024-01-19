const activityImageModel = require("../model/activity_image_model");
const fs = require("fs");

function addActivityImage(req, res) {
  const activityImage = {
    ImageUrl: req.file.path.replace(/\\/g, "/"),
    ActivityId: req.body.activityId,
    ActivityImageTypeId: req.body.activityImageTypeId,
    ActivityTypeSerialId: req.body.activityTypeSerialId,
    IsActive: true,
  };
  activityImageModel
    .create(activityImage)
    .then((result) => {
      res.status(201).json({
        [process.env.PROJECT_NAME]: {
          status: 201,
          timestamp: Date.now(),
          message: "Activity Image Created",
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

function updateActivityImage(req, res) {
  const activityImage = {
    ImageUrl: req.file.path.replace(/\\/g, "/"),
    ActivityId: req.body.activityId,
    ActivityImageTypeId: req.body.activityImageTypeId,
    ActivityTypeSerialId: req.body.activityTypeSerialId,
    IsActive: true,
  };
  activityImageModel
    .findOne({ where: { ActivityImageId: req.body.activityImageId } })
    .then((activityImageResult) => {
      if (activityImageResult === null) {
        res.status(404).json({
          [process.env.PROJECT_NAME]: {
            status: 404,
            timestamp: Date.now(),
            message: `Activity status with ${req.body.activityImageId} not found!`,
          },
        });
      } else {
        if (activityImageResult.ImageUrl != null) {
          let deleteHandler = function (err) {
            if (err) {
              console.log("Unlink Failed", err);
            } else {
              console.log("File Deleted");
            }
          };
          fs.unlink(activityImageResult.ImageUrl, deleteHandler);
          activityImageModel
            .update(activityImage, {
              where: { ActivityImageId: req.body.activityImageId },
            })
            .then((result) => {
              if (result) {
                res.status(200).json({
                  [process.env.PROJECT_NAME]: {
                    status: 200,
                    timestamp: Date.now(),
                    message: "Activity Image Updated",
                    data: result,
                  },
                });
              } else {
                res.status(500).json({
                  [process.env.PROJECT_NAME]: {
                    status: 500,
                    timestamp: Date.now(),
                    message: "Unable to update the Activity Image",
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
        } else {
          activityImageModel
            .update(activityImage, {
              where: { ActivityImageId: req.body.activityImageId },
            })
            .then((result) => {
              if (result) {
                res.status(200).json({
                  [process.env.PROJECT_NAME]: {
                    status: 200,
                    timestamp: Date.now(),
                    message: "Activity Image Updated",
                    data: result,
                  },
                });
              } else {
                res.status(500).json({
                  [process.env.PROJECT_NAME]: {
                    status: 500,
                    timestamp: Date.now(),
                    message: "Unable to update the Activity Image",
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
      }
    });
}

function getAllActivityImages(req, res) {
  activityImageModel
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
            message: "Fetched All Activity Image",
            data: result,
          },
        });
      } else {
        res.status(500).json({
          [process.env.PROJECT_NAME]: {
            status: 500,
            timestamp: Date.now(),
            message: "Unable to fetch Activity Images",
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
  addActivityImage: addActivityImage,
  updateActivityImage: updateActivityImage,
  getAllActivityImages: getAllActivityImages,
};
