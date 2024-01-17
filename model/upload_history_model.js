const Sequelize = require("sequelize");
const db = require("../utils/database_connection");
const activityModel = require("./activity_model");
const activityTypeModel = require("./activity_type_model");

const UploadHistory = db.define(
  "UploadHistory",
  {
    UploadHistoryId: {
      type: Sequelize.DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    UploadedDateTime: {
        type: Sequelize.DataTypes.STRING,
    },
    IsActive: {
      type: Sequelize.DataTypes.BOOLEAN,
      default: false,
    },
  },
  {
    tableName: "UploadHistory",
    timestamps: true,
    createdAt: "CreatedAt",
    updatedAt: "UpdatedAt",
    freezeTableName: true,
  },
);

UploadHistory.belongsTo(activityModel, {foreignKey: "ActivityId"});
UploadHistory.belongsTo(activityTypeModel, {foreignKey: "UploadTypeId"});

module.exports = UploadHistory;
