const Sequelize = require("sequelize");
const db = require("../utils/database_connection");

const ActivityImageType = db.define(
  "ActivityImageType",
  {
    ActivityImageTypeId: {
      type: Sequelize.DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    ActivityTypeName: {
        type: Sequelize.DataTypes.STRING,
    },
    IsActive: {
      type: Sequelize.DataTypes.BOOLEAN,
      default: false,
    },
  },
  {
    tableName: "ActivityImageType",
    timestamps: true,
    createdAt: "CreatedAt",
    updatedAt: "UpdatedAt",
    freezeTableName: true,
  },
);

module.exports = ActivityImageType;
