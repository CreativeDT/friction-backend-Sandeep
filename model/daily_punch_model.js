const Sequelize = require("sequelize");
const db = require("../utils/database_connection");
const userModel = require("./user_model");

const DailyPunch = db.define(
  "DailyPunch",
  {
    DailyPunchId: {
      type: Sequelize.DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    CheckInStatus: {
        type: Sequelize.DataTypes.STRING,
    },
    PunchdateTime: {
        type: Sequelize.DataTypes.STRING,
    },
    IsActive: {
      type: Sequelize.DataTypes.BOOLEAN,
      default: false,
    },
  },
  {
    tableName: "DailyPunch",
    timestamps: true,
    createdAt: "CreatedAt",
    updatedAt: "UpdatedAt",
    freezeTableName: true,
  },
);

DailyPunch.belongTo(userModel, {foreignKey: "UserId"});

module.exports = DailyPunch;
