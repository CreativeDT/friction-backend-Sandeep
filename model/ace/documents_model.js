const Sequelize = require("sequelize");
const db = require("../../utils/database_connection");

const Documents = db.define(
  "Documents",
  {
    DocumentId: {
      type: Sequelize.DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    DocumentName: {
      type: Sequelize.DataTypes.STRING,
    },
    DocumentType: {
      type: Sequelize.DataTypes.STRING,
    },
    DocumentDescription: {
      type: Sequelize.DataTypes.TEXT,
    },
  },
  {
    tableName: "Documents",
    timestamps: true,
    createdAt: "CreatedAt",
    updatedAt: "UpdatedAt",
    freezeTableName: true,
  },
);

module.exports = Documents;
