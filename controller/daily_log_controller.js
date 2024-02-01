const Sequelize = require("sequelize");
const db = require("./../utils/database_connection");
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
  // Paginination
  const page =
    parseInt(req.body.pageNumber) || parseInt(process.env.DEFAULT_PAGE_NUMBER);
  const limit =
    parseInt(req.body.limit) || parseInt(process.env.DEFAULT_PAGE_LENGTH);
  const offset = (page - 1) * limit;

  // Filter Records
  const {
    filterServiceTechId,
    filterActualWorkStartDate,
    filterActualWorkEndDate,
    search,
  } = req.body;

  let sqlQuery = `
  SELECT
    dl.*,
    st.ServiceTechEmail,
    a.*,
    ru.*,
    IFNULL(helper_count.HelperCount, 0) AS HelperCount
  FROM
    dailylog dl
    LEFT JOIN activity a ON dl.ActivityId = a.ActivityId
    LEFT JOIN servicetech st ON a.ServiceTechId = st.ServiceTechId
    LEFT JOIN railunitlocation ru ON a.RailUnitLocationId = ru.Id
    LEFT JOIN (
        SELECT
            ActivityId,
            COUNT(HelperId) AS HelperCount
        FROM
            helper
        GROUP BY
            ActivityId
    ) AS helper_count ON a.ActivityId = helper_count.ActivityId
  WHERE
    dl.IsActive = true
  `;

  if (search) {
    sqlQuery += `
      AND (
        ru.Division LIKE '%${search}%'
        OR ru.SubDivision LIKE '%${search}%'
        OR ru.MilePost LIKE '%${search}%'
        OR ru.Railroad LIKE '%${search}%'
      )
    `;
  }

  if (filterServiceTechId) {
    sqlQuery += `
      AND a.ServiceTechId = ${filterServiceTechId}
    `;
  }

  if (filterActualWorkStartDate && filterActualWorkEndDate) {
    sqlQuery += `
      AND (
        STR_TO_DATE(a.ActualWorkStartDate, '%d/%m/%Y %H:%i:%s') BETWEEN STR_TO_DATE('${filterActualWorkStartDate}', '%d/%m/%Y %H:%i:%s')
        AND STR_TO_DATE('${filterActualWorkEndDate}', '%d/%m/%Y %H:%i:%s')
      )
    `;
  }

  sqlQuery += `
    ORDER BY dl.createdAt DESC
    LIMIT ${limit} OFFSET ${offset}
  `;

  db.query(sqlQuery, { type: Sequelize.QueryTypes.SELECT })
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
            message: "Fetched Dailylog",
            totalCount: result.length,
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
