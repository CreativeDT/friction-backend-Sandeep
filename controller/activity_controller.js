const activityModel = require("./../model/activity_model");

function addActivity(req, res) {
  const activity = {
    
  };
  activityModel
    .create(activity)
    .then((result) => {
      if (result) {
        res.status(201).json({
          [process.env.PROJECT_NAME]: {
            status: 201,
            timestamp: Date.now(),
            message: "Activity Created",
            data: result,
          },
        });
      } else {
        res.status(500).json({
          [process.env.PROJECT_NAME]: {
            status: 500,
            timestamp: Date.now(),
            message: "Unable to create Activity",
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
