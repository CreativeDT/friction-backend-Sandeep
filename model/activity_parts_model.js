const Sequelize = require("sequelize");
const db = require("../utils/database_connection");
const activityModel = require("./activity_model");
const partsModel = require("./parts_model");

const ActivityParts = db.define(
  "ActivityParts",
  {
    ActivityPartsId: {
      type: Sequelize.DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    IsActive: {
      type: Sequelize.DataTypes.BOOLEAN,
      default: false,
    },
  },
  {
    tableName: "ActivityParts",
    timestamps: true,
    createdAt: "CreatedAt",
    updatedAt: "UpdatedAt",
    freezeTableName: true,
  },
);

ActivityParts.belongTo(activityModel, {foreignKey: "ActivityId"});
ActivityParts.belongTo(partsModel, {foreignKey: "PartsId"});

module.exports = ActivityParts;
