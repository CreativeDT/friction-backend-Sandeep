const Sequelize = require("sequelize");
const db = require("../utils/database_connection");

const UploadType = db.define(
  "UploadType",
  {
    UploadTypeId: {
      type: Sequelize.DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    UploadTypeName: {
      type: Sequelize.DataTypes.STRING,
    },
    IsActive: {
      type: Sequelize.DataTypes.BOOLEAN,
      default: false,
    },
  },
  {
    tableName: "UploadType",
    timestamps: true,
    createdAt: "CreatedAt",
    updatedAt: "UpdatedAt",
    freezeTableName: true,
  },
);

module.exports = UploadType;
