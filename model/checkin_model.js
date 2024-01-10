const Sequelize = require("sequelize");
const db = require("../utils/database_connection");
const activityModel = require("./activity_model");
const userModel = require("./user_model");

const CheckIn = db.define(
  "CheckIn",
  {
    CheckInId: {
      type: Sequelize.DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    StartDateTime: {
        type: Sequelize.DataTypes.STRING,
    },
    EndDateTime: {
        type: Sequelize.DataTypes.STRING,
    },
    
    IsActive: {
      type: Sequelize.DataTypes.BOOLEAN,
      default: false,
    },
  },
  {
    tableName: "CheckIn",
    timestamps: true,
    createdAt: "CreatedAt",
    updatedAt: "UpdatedAt",
    freezeTableName: true,
  },
);

CheckIn.belongTo(activityModel, {foreignKey: "ActivityId"});
CheckIn.belongTo(userModel, {foreignKey: "UserId"});

module.exports = CheckIn;
