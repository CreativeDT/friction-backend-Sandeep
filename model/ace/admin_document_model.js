const Sequelize = require("sequelize");
const db = require("../../utils/database_connection");
const Administrator = require("../../model/ace/administrator_model");
const Documents = require("../../model/ace/documents_model");

const AdminDocument = db.define(
  "AdminDocument",
  {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    isActive: {
      type: Sequelize.DataTypes.BOOLEAN,
    },
    selfGranted: {
      type: Sequelize.DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "AdminDocument",
    timestamps: true,
    createdAt: "CreatedAt",
    updatedAt: "UpdatedAt",
  },
);

Administrator.belongsToMany(Documents, { through: AdminDocument });
Documents.belongsToMany(Administrator, { through: AdminDocument });
