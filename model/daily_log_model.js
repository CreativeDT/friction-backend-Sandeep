const Sequelize = require("sequelize");
const db = require("../utils/database_connection");
const activityModel = require("./activity_model");

const DailyLog = db.define(
  "DailyLog",
  {
    DailyLogId: {
      type: Sequelize.DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    UploadedDateTime: {
        type: Sequelize.DataTypes.STRING,
    },
    IsSuccess: {
        type: Sequelize.DataTypes.BOOLEAN,
    },
    IsActive: {
      type: Sequelize.DataTypes.BOOLEAN,
      default: false,
    },
  },
  {
    tableName: "DailyLog",
    timestamps: true,
    createdAt: "CreatedAt",
    updatedAt: "UpdatedAt",
    freezeTableName: true,
  },
);

DailyLog.belongTo(activityModel, {foreignKey: "ActivityId"});

module.exports = DailyLog;
