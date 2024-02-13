const helperModel = require("../model/helper_model");
const serviceTechModel = require("../model/service_tech_model");

function addHelper(req, res) {
  const helper = {
    EstimatedWorkStartDate: req.body.estimatedWorkStartDate,
    EstimatedWorkEndDate: req.body.estimatedWorkEndDate,
    ActualWorkStartDate: req.body.actualWorkStartDate,
    ActualWorkEndDate: req.body.actualWorkEndDate,
    ServiceTechId: req.body.serviceTechId,
    ActivityId: req.body.activityId,
    IsActive: true,
  };
  helperModel
    .create(helper)
    .then((result) => {
      if (result) {
        res.status(201).json({
          [process.env.PROJECT_NAME]: {
            status: 201,
            timestamp: Date.now(),
            message: "Helper Created",
            data: result,
          },
        });
      } else {
        res.status(500).json({
          [process.env.PROJECT_NAME]: {
            status: 500,
            timestamp: Date.now(),
            message: "Unable to create Helper",
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

function updateHelper(req, res) {
  const helper = {
    EstimatedWorkStartDate: req.body.estimatedWorkStartDate,
    EstimatedWorkEndDate: req.body.estimatedWorkEndDate,
    ActualWorkStartDate: req.body.actualWorkStartDate,
    ActualWorkEndDate: req.body.actualWorkEndDate,
    ServiceTechId: req.body.serviceTechId,
    ActivityId: req.body.activityId,
    IsActive: true,
  };
  helperModel
    .findOne({ where: { HelperId: req.body.helperId } })
    .then((helperResult) => {
      if (helperResult === null) {
        res.status(404).json({
          [process.env.PROJECT_NAME]: {
            status: 404,
            timestamp: Date.now(),
            message: `Helper with ${req.body.helperId} not found!`,
          },
        });
      } else {
        helperModel
          .update(helper, { where: { HelperId: req.body.helperId } })
          .then((result) => {
            if (result) {
              res.status(200).json({
                [process.env.PROJECT_NAME]: {
                  status: 200,
                  timestamp: Date.now(),
                  message: "Helper Updated",
                  data: helper,
                },
              });
            } else {
              res.status(500).json({
                [process.env.PROJECT_NAME]: {
                  status: 500,
                  timestamp: Date.now(),
                  message: "Unable to update the Helper",
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
    });
}

function getAllHelpers(req, res) {
  helperModel
    .findAll({
      where: { IsActive: true },
      attributes: { exclude: ["CreatedAt", "UpdatedAt", "IsActive"] },
    })
    .then((result) => {
      res.status(200).json({
        [process.env.PROJECT_NAME]: {
          status: 200,
          timestamp: Date.now(),
          message: "Fetched All Helper",
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

function getSingleForActivity(req, res) {
  helperModel
    .findOne({
      where: { ActivityId: req.body.activityId, IsActive: true },
      include: [
        {
          model: serviceTechModel,
          attributes: ["ServiceTechEmail"],
        },
      ],
      attributes: { exclude: ["CreatedAt", "UpdatedAt", "IsActive"] },
    })
    .then((result) => {
      if (result === null) {
        res.status(404).json({
          [process.env.PROJECT_NAME]: {
            status: 404,
            timestamp: Date.now(),
            message: `Helper with ActivityId ${req.body.helperId} not found!`,
          },
        });
      } else {
        res.status(200).json({
          [process.env.PROJECT_NAME]: {
            status: 200,
            timestamp: Date.now(),
            message: "Fetched All Helper",
            data: {
              HelperId: result.HelperId,
              EstimatedWorkStartDate: result.EstimatedWorkStartDate,
              EstimatedWorkEndDate: result.EstimatedWorkEndDate,
              ActualWorkStartDate: result.ActualWorkStartDate,
              ActualWorkEndDate: result.ActualWorkEndDate,
              ServiceTechEmail: result.ServiceTechId
                ? result.ServiceTech.ServiceTechEmail
                : null,
              ActivityId: 1,
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
  addHelper: addHelper,
  updateHelper: updateHelper,
  getAllHelpers: getAllHelpers,
  getSingleForActivity: getSingleForActivity,
};
