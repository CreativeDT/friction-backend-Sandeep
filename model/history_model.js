const Sequelize = require("sequelize");
const db = require("../utils/database_connection");
const userModel = require("./user_model");
const uploadTypeModel = require("./upload_type_model");

const History = db.define(
  "History",
  {
    HistoryId: {
      type: Sequelize.DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    IsSucess: {
      type: Sequelize.DataTypes.BOOLEAN,
    },
    IsActive: {
      type: Sequelize.DataTypes.BOOLEAN,
      default: false,
    },
  },
  {
    tableName: "History",
    timestamps: true,
    createdAt: "CreatedAt",
    updatedAt: "UpdatedAt",
    freezeTableName: true,
  },
);

History.belongsTo(uploadTypeModel, { foreignKey: "UploadTypeId" });
History.belongsTo(userModel, { foreignKey: "UserId" });

module.exports = History;
